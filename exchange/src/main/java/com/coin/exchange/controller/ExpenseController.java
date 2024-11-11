package com.coin.exchange.controller;

import com.coin.exchange.model.Expense;
import com.coin.exchange.service.ExpenseCalculatorService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseCalculatorService expenseCalculatorService;

    @PostMapping("/calculateTotal")
    public JsonNode calculateTotal(@RequestBody List<Expense> expenses,
                                   @RequestParam String targetCurrency,
                                   @RequestParam Double tax) {

        return expenseCalculatorService.calculateTotalExpensesInCurrency(expenses, targetCurrency, tax);
    }

}
