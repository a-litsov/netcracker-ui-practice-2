package com.edu_netcracker.nn.adlitsov.ui.homework2;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import static com.edu_netcracker.nn.adlitsov.ui.homework2.Solution.Status;

public class QuadraticEquation {
    private double a, b, c;

    @JsonCreator
    public QuadraticEquation(@JsonProperty("a") double a, @JsonProperty("b") double b, @JsonProperty("c") double c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public double getA() {
        return a;
    }

    public double getB() {
        return b;
    }

    public double getC() {
        return c;
    }

    @JsonIgnore
    public Solution getSolution() {
        if (a == 0 && b == 0) {
            if (c == 0) {
                return new Solution(Status.ALL_REAL_NUMBERS, null);
            } else {
                return new Solution(Status.NO_ROOTS_IN_REAL_NUMBERS, null);
            }
        }
        double discr = Math.pow(b, 2) - 4 * a * c;
        if (discr < 0) {
            return new Solution(Status.NO_ROOTS_IN_REAL_NUMBERS, null);
        } else {
            Status status = Status.HAS_ROOTS;
            if (discr == 0) {
                return new Solution(status, new double[]{-b / (2 * a)});
            } else {
                return new Solution(status, new double[]{
                        (-b + Math.sqrt(discr)) / (2 * a),
                        (-b - Math.sqrt(discr)) / (2 * a)
                });
            }
        }
    }
}
