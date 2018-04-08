package com.edu_netcracker.nn.adlitsov.ui.homework2;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

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
        if (a == 0 && b == 0 && c == 0) {
            return new Solution(Status.ALL_REAL_NUMBERS, null);
        }
        double discr = Math.pow(b, 2) - 4 * a * c;
        if (discr < 0) {
            return new Solution(Status.NO_ROOTS_IN_REAL_NUMBERS, null);
        } else {
            if (discr == 0) {
                return new Solution(Status.SINGLE_ROOT, new double[]{-b / (2 * a)});
            } else {
                return new Solution(Status.TWO_ROOTS, new double[]{
                        (-b + Math.sqrt(discr)) / (2 * a),
                        (-b - Math.sqrt(discr)) / (2 * a)
                });
            }
        }
    }

    public static void main(String[] args) throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        String equationStr = "{\"a\": 1, \"b\": 2, \"c\": 3}";
        QuadraticEquation eq = mapper.readValue(equationStr, QuadraticEquation.class);
        String rootsStr = mapper.writeValueAsString(eq);
        System.out.println(rootsStr);
    }
}
