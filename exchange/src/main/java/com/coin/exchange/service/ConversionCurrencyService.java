package com.coin.exchange.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConversionCurrencyService {

    private static final String API_KEY = "47ec8325dfb87944f14d75fa";
    private static final String API_URL = "https://v6.exchangerate-api.com/v6/" + API_KEY + "/pair/";

    private final RestTemplate restTemplate;

    @Autowired
    public ConversionCurrencyService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

        public JsonNode getExchangeRate(String fromCurrency, String toCurrency) {
            String url = API_URL + fromCurrency + "/" + toCurrency;
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            if (response == null || response.get("conversion_rate") == null) {
                throw new RuntimeException("Conversion rate not found for the provided currencies.");
            }
            return response.get("conversion_rate");
        }


        public JsonNode getExchangePair(String fromCurrency, String toCurrency, String amount) {
            String url = API_URL + fromCurrency + "/" + toCurrency + "/" + amount;
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            if (response == null || response.get("conversion_result") == null) {
                throw new RuntimeException("Conversion result not found for the provided pair currencies.");
            }
            return response.get("conversion_result");
        }
    }


