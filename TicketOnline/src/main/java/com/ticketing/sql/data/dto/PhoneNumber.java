package com.ticketing.sql.data.dto;

public class PhoneNumber {
    private final int area;   //  area code (3 digits)
    private final int rest;   //  rest of the number code (7 digits)

    public PhoneNumber(String phone) {
        this.area = Integer.parseInt(phone.substring(0,2));
        this.rest = Integer.parseInt(phone.substring(3,9));

    }

    // how you're supposed to implement equals
    public boolean equals(Object y) {
        if (y == this) return true;
        if (y == null) return false;
        if (y.getClass() != this.getClass()) return false;
        PhoneNumber that = (PhoneNumber) y;
        return (this.area == that.area) && (this.rest == that.rest);
    }

    public String toString() {
        return String.format("%03d%07d", area, rest);
    }
}
