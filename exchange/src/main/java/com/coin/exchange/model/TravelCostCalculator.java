package com.coin.exchange.model;

import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TravelCostCalculator {
    private String targetCurrency;
    private List<Expense> expenses;

    public TravelCostCalculator(String targetCurrency) {
        this.targetCurrency = targetCurrency;
        this.expenses = new ArrayList<>();
    }

}
