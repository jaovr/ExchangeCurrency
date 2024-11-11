package com.coin.exchange.service;

import com.coin.exchange.model.Expense;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ExpenseCalculatorService {

    private static final String API_KEY = "47ec8325dfb87944f14d75fa";
    private static final String API_URL = "https://v6.exchangerate-api.com/v6/" + API_KEY + "/pair/";
    private final ObjectMapper objectMapper = new ObjectMapper();
    private RestTemplate restTemplate;

    @Autowired
    public ExpenseCalculatorService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public JsonNode calculateTotalExpensesInCurrency(List<Expense> expenses, String toCurrency, double taxRate) {
        double totalConvertedAmount = 0;

        for (Expense expense : expenses) {
            String fromCurrency = expense.getCurrency();
            double amount = expense.getAmount();

            String url = API_URL + fromCurrency + "/" + toCurrency + "/" + amount;
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);

            if (response == null || response.get("conversion_result") == null) {
                throw new RuntimeException("Resultado de conversão não encontrado para as moedas fornecidas.");
            }

            double convertedAmount = response.get("conversion_result").asDouble();
            totalConvertedAmount += convertedAmount;
        }

        double finalTotal = totalConvertedAmount * (1 + taxRate / 100);

        ObjectNode result = objectMapper.createObjectNode();
        result.put("to_currency", toCurrency);
        result.put("total_converted_amount", totalConvertedAmount);
        result.put("final_total_with_tax", finalTotal);

        return result;
    }
}
