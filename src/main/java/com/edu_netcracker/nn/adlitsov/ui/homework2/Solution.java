package com.edu_netcracker.nn.adlitsov.ui.homework2;

import java.io.IOException;
import java.util.Arrays;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Solution {
    public enum Status {
        ALL_REAL_NUMBERS, NO_ROOTS_IN_REAL_NUMBERS, HAS_ROOTS
    }

    private Status status;
    private double[] roots;

    @JsonCreator
    public Solution(@JsonProperty("status") Status status, @JsonProperty("roots") double[] roots) {
        checkCompatibility(status, roots);
        this.status = status;
        this.roots = Arrays.copyOf(roots, roots.length);
    }

    private void checkCompatibility(Status status, double[] roots) {
        if (status == null || roots == null) {
            throw new IllegalArgumentException("Status and roots must be not null!");
        }

        boolean correct = false;
        correct |= (status == Status.ALL_REAL_NUMBERS || status == Status.NO_ROOTS_IN_REAL_NUMBERS) && roots.length == 0;
        correct |= (status == Status.HAS_ROOTS && roots.length != 0);
        if (!correct) {
            throw new IllegalArgumentException("This status and roots are not compatible!");
        }
    }

    public Status getStatus() {
        return status;
    }

    public double[] getRoots() {
        return Arrays.copyOf(roots, roots.length);
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
