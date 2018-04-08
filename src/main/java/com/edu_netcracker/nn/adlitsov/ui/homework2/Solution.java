package com.edu_netcracker.nn.adlitsov.ui.homework2;

import java.io.IOException;
import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Solution {
    public enum Status {
        ALL_REAL_NUMBERS, NO_ROOTS_IN_REAL_NUMBERS, SINGLE_ROOT, TWO_ROOTS
    }

    private Status status;
    private double[] roots;

    @JsonCreator
    public Solution(@JsonProperty("status") Status status, @JsonProperty("roots") double[] roots) {
        this.status = status;
        this.roots = roots;
    }

    public Status getStatus() {
        return status;
    }

    public double[] getRoots() {
        return roots;
    }

    public static void main(String[] args) throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        Solution sol = new Solution(Status.ALL_REAL_NUMBERS, new double[]{});
        String solStr = mapper.writeValueAsString(sol);
        System.out.println(solStr);

        sol = mapper.readValue(solStr, Solution.class);

        new Solution(Status.ALL_REAL_NUMBERS, new double[]{1});
    }
}
