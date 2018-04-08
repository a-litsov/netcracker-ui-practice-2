package com.edu_netcracker.nn.adlitsov.ui.homework2;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Solution {
    public enum Status {
        ALL_REAL_NUMBERS, NO_ROOTS_IN_REAL_NUMBERS, HAS_ROOTS
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
}
