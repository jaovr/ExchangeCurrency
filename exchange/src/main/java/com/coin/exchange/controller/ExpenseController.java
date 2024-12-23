package com.coin.exchange.controller;

import com.coin.exchange.model.Expense;
import com.coin.exchange.service.ExpenseCalculatorService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseCalculatorService expenseCalculatorService;

    public ExpenseController(ExpenseCalculatorService expenseCalculatorService) {
        this.expenseCalculatorService = expenseCalculatorService;
    }

    @PostMapping("/calculateTotal")
    public JsonNode calculateTotal(@RequestBody List<Expense> expenses,
                                   @RequestParam String targetCurrency,
                                   @RequestParam Double tax) {

        return expenseCalculatorService.calculateTotalExpensesInCurrency(expenses, targetCurrency, tax);
    }

}
