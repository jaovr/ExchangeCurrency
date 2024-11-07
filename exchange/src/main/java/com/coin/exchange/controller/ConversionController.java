package com.coin.exchange.controller;

import com.coin.exchange.service.ConversionCurrencyService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversion")
public class ConversionController {

    private final ConversionCurrencyService conversionCurrencyService;

    public ConversionController(ConversionCurrencyService conversionCurrencyService) {
        this.conversionCurrencyService = conversionCurrencyService;
    }

    @GetMapping("/rate/{fromCurrency}/{toCurrency}")
    public JsonNode getConversionRate(
            @PathVariable String fromCurrency,
            @PathVariable String toCurrency
            ) {
        return conversionCurrencyService.getExchangeRate(fromCurrency, toCurrency);
    }

    @GetMapping("/rate/pair/{fromCurrency}/{toCurrency}/{amount}")
    public JsonNode getConversionPair(
            @PathVariable String fromCurrency,
            @PathVariable String toCurrency,
            @PathVariable String amount
            ) {
        return conversionCurrencyService.getExchangePair(fromCurrency, toCurrency, amount);
    }
}
