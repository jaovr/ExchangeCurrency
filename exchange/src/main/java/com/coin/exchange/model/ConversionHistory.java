package com.coin.exchange.model;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
@Setter
public class ConversionHistory {
    private String fromCurrency;
    private String toCurrency;
    private BigDecimal amount;
    private BigDecimal convertedAmount;
    private LocalDateTime date;

    public ConversionHistory(String fromCurrency, String toCurrency, BigDecimal amount, LocalDateTime date) {
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.amount = amount;
        this.convertedAmount = amount;
        this.date = date;
    }

    @Override
    public String toString() {
        return "ConversionHistory{" +
                "fromCurrency='" + fromCurrency + '\'' +
                ", toCurrency='" + toCurrency + '\'' +
                ", amount=" + amount +
                ", convertedAmount=" + convertedAmount +
                ", date=" + date +
                '}';
    }


}
