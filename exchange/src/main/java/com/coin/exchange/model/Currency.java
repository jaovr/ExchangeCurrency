package com.coin.exchange.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Currency {
    private String symbol;
    private String name;

    public Currency(String symbol, String name) {
        this.symbol = symbol;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Currency: " + name +
                ", Symbol: " + symbol;
    }




}
