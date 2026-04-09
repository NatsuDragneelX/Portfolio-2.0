"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, RotateCcw, UserPlus, Receipt } from "lucide-react";
import styles from "./ExpenseSplitter.module.css";

function newId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function settleDebts(balances) {
  const creditors = [];
  const debtors = [];
  for (const [id, raw] of Object.entries(balances)) {
    if (raw > 0.005) creditors.push({ id, amount: raw });
    if (raw < -0.005) debtors.push({ id, amount: -raw });
  }
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);
  const txs = [];
  let i = 0;
  let j = 0;
  while (i < creditors.length && j < debtors.length) {
    const pay = Math.min(creditors[i].amount, debtors[j].amount);
    if (pay > 0.005) {
      txs.push({
        from: debtors[j].id,
        to: creditors[i].id,
        amount: Math.round(pay * 100) / 100,
      });
    }
    creditors[i].amount -= pay;
    debtors[j].amount -= pay;
    if (creditors[i].amount < 0.01) i += 1;
    if (debtors[j].amount < 0.01) j += 1;
  }
  return txs;
}

function computeBalances(people, expenses) {
  const balances = Object.fromEntries(people.map((p) => [p.id, 0]));
  for (const e of expenses) {
    const ids = e.participantIds;
    if (!ids.length) continue;
    const share = e.amount / ids.length;
    for (const id of ids) {
      if (balances[id] !== undefined) balances[id] -= share;
    }
    if (balances[e.payerId] !== undefined) {
      balances[e.payerId] += e.amount;
    }
  }
  return balances;
}

function money(n) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(2);
}

export function ExpenseSplitter() {
  const [people, setPeople] = React.useState([
    { id: newId("p"), name: "Alex" },
    { id: newId("p"), name: "Jordan" },
  ]);
  const [newName, setNewName] = React.useState("");
  const [expenses, setExpenses] = React.useState([]);

  const [draftAmount, setDraftAmount] = React.useState("");
  const [draftPayer, setDraftPayer] = React.useState("");
  const [draftLabel, setDraftLabel] = React.useState("");
  const [draftSplit, setDraftSplit] = React.useState({});

  React.useEffect(() => {
    if (!people.length) return;
    const ok = draftPayer && people.some((p) => p.id === draftPayer);
    if (!ok) setDraftPayer(people[0].id);
  }, [people, draftPayer]);

  React.useEffect(() => {
    setDraftSplit((prev) => {
      const next = { ...prev };
      for (const p of people) {
        if (next[p.id] === undefined) next[p.id] = true;
      }
      for (const k of Object.keys(next)) {
        if (!people.some((p) => p.id === k)) delete next[k];
      }
      return next;
    });
  }, [people]);

  const balances = React.useMemo(
    () => computeBalances(people, expenses),
    [people, expenses]
  );

  const settlements = React.useMemo(
    () => settleDebts({ ...balances }),
    [balances]
  );

  const nameById = React.useMemo(
    () => Object.fromEntries(people.map((p) => [p.id, p.name])),
    [people]
  );

  const addPerson = () => {
    const n = newName.trim();
    if (!n) return;
    const id = newId("p");
    setPeople((prev) => [...prev, { id, name: n }]);
    setNewName("");
    if (!draftPayer) setDraftPayer(id);
  };

  const removePerson = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    setExpenses((prev) =>
      prev.filter((e) => e.payerId !== id && !e.participantIds.includes(id))
    );
    if (draftPayer === id) setDraftPayer("");
  };

  const addExpense = () => {
    const amount = parseFloat(String(draftAmount).replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0) return;
    const participantIds = people.filter((p) => draftSplit[p.id]).map((p) => p.id);
    if (!participantIds.length) return;
    if (!draftPayer || !people.some((p) => p.id === draftPayer)) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: newId("e"),
        label: draftLabel.trim() || "Expense",
        amount,
        payerId: draftPayer,
        participantIds,
      },
    ]);
    setDraftAmount("");
    setDraftLabel("");
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const resetAll = () => {
    setPeople([
      { id: newId("p"), name: "Alex" },
      { id: newId("p"), name: "Jordan" },
    ]);
    setExpenses([]);
    setNewName("");
    setDraftAmount("");
    setDraftLabel("");
    setDraftPayer("");
  };

  const buildExportText = () => {
    const lines = [];
    lines.push("Expense splitter — export");
    lines.push("");
    lines.push("People:");
    people.forEach((p) => lines.push(`- ${p.name}`));
    lines.push("");
    lines.push("Expenses:");
    expenses.forEach((e) => {
      const who = e.participantIds.map((id) => nameById[id]).join(", ");
      lines.push(
        `- ${e.label}: ${money(e.amount)} (paid by ${nameById[e.payerId]}, split: ${who})`
      );
    });
    lines.push("");
    lines.push("Net balance (paid − owed share):");
    people.forEach((p) => {
      lines.push(`- ${p.name}: ${money(balances[p.id] ?? 0)}`);
    });
    lines.push("");
    lines.push("Settle up (minimum transfers):");
    if (!settlements.length) lines.push("- Everyone is settled.");
    settlements.forEach((t) => {
      lines.push(
        `- ${nameById[t.from]} pays ${nameById[t.to]}: ${money(t.amount)}`
      );
    });
    return lines.join("\n");
  };

  const exportTxt = () => {
    const blob = new Blob([buildExportText()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expense-split.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSplit = (id) => {
    setDraftSplit((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel space-y-4 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-[12rem] flex-1 space-y-2">
            <label htmlFor="es-name" className="text-sm font-medium">
              Add person
            </label>
            <Input
              id="es-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              onKeyDown={(e) => e.key === "Enter" && addPerson()}
            />
          </div>
          <Button type="button" onClick={addPerson} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th className="w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
                      onClick={() => removePerson(p.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel space-y-4 rounded-2xl p-4 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Receipt className="h-5 w-5 text-primary" />
          Add expense
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="es-label" className="text-sm font-medium">
              Label
            </label>
            <Input
              id="es-label"
              value={draftLabel}
              onChange={(e) => setDraftLabel(e.target.value)}
              placeholder="Dinner, rent, taxi…"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="es-amt" className="text-sm font-medium">
              Amount
            </label>
            <Input
              id="es-amt"
              inputMode="decimal"
              value={draftAmount}
              onChange={(e) => setDraftAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="space-y-2">
          <span id="es-paid-label" className="text-sm font-medium">
            Paid by
          </span>
          <Select
            value={
              people.length
                ? people.some((p) => p.id === draftPayer)
                  ? draftPayer
                  : people[0].id
                : undefined
            }
            onValueChange={setDraftPayer}
            disabled={!people.length}
          >
            <SelectTrigger
              id="es-paid"
              aria-labelledby="es-paid-label"
              className="w-full max-w-md"
            >
              <SelectValue placeholder={people.length ? "Who paid?" : "Add people first"} />
            </SelectTrigger>
            <SelectContent>
              {people.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium">Split equally among</span>
          <div className="flex flex-wrap gap-2">
            {people.map((p) => (
              <label
                key={p.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={!!draftSplit[p.id]}
                  onChange={() => toggleSplit(p.id)}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                {p.name}
              </label>
            ))}
          </div>
        </div>
        <Button type="button" onClick={addExpense}>
          Add expense
        </Button>
      </div>

      <div className="glass-panel space-y-3 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight">Expenses</h2>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Label</th>
                <th>Amount</th>
                <th>Paid by</th>
                <th>Split</th>
                <th className="w-20" />
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted-foreground">
                    No expenses yet.
                  </td>
                </tr>
              ) : (
                expenses.map((e) => (
                  <tr key={e.id}>
                    <td>{e.label}</td>
                    <td className="font-mono">{money(e.amount)}</td>
                    <td>{nameById[e.payerId]}</td>
                    <td className="max-w-[200px] truncate">
                      {e.participantIds.map((id) => nameById[id]).join(", ")}
                    </td>
                    <td className="text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExpense(e.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel space-y-3 rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight">Net balance</h2>
          <p className="text-xs text-muted-foreground">
            Positive = paid more than fair share; negative = owes the group.
          </p>
          <div className={styles.scroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Person</th>
                  <th className="text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {people.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="text-right font-mono">
                      {money(balances[p.id] ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel space-y-3 rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight">Settle up</h2>
          <p className="text-xs text-muted-foreground">
            Minimum cash transfers so all balances net to zero.
          </p>
          <div className={styles.scroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {settlements.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-muted-foreground">
                      Add expenses to see who owes whom.
                    </td>
                  </tr>
                ) : (
                  settlements.map((t, idx) => (
                    <tr key={`${t.from}-${t.to}-${idx}`}>
                      <td>{nameById[t.from]}</td>
                      <td>{nameById[t.to]}</td>
                      <td className="text-right font-mono">{money(t.amount)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={exportTxt} className="gap-2">
          <Download className="h-4 w-4" />
          Export .txt
        </Button>
        <Button type="button" variant="outline" onClick={resetAll} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset all
        </Button>
      </div>
    </div>
  );
}
