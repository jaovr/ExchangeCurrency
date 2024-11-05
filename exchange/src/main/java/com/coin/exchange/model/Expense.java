package com.coin.exchange.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Expense {

    private String description;
    private Double amount;
    private String currency;

    public Expense(String description, Double amount, String currency) {
        this.description = description;
        this.amount = amount;
        this.currency = currency;
    }

    @Override
    public String toString() {
        return "Expense [description=" + description +
                ", amount=" + amount +
                ", currency=" + currency +
                "]";
    }

}
