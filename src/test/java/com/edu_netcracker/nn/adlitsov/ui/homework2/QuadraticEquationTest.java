package com.edu_netcracker.nn.adlitsov.ui.homework2;

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

public class QuadraticEquationTest {
    private static final double DELTA = 1e-5;

    @Test
    public void shouldWorkCorrectlyForNoRootsCase() {
        final double a = 7, b = 2, c = 5;
        QuadraticEquation eq = new QuadraticEquation(a, b, c);
        Solution sol = eq.getSolution();

        assertEquals(Solution.Status.NO_ROOTS_IN_REAL_NUMBERS, sol.getStatus());
        assertArrayEquals(null, sol.getRoots(), DELTA);
    }

    @Test
    public void shouldWorkCorrectlyForAllRealNumbersCase() {
        final double a = 0, b = 0, c = 0;
        QuadraticEquation eq = new QuadraticEquation(a, b, c);
        Solution sol = eq.getSolution();

        assertEquals(Solution.Status.ALL_REAL_NUMBERS, sol.getStatus());
        assertArrayEquals(null, sol.getRoots(), DELTA);
    }

    @Test
    public void shouldWorkCorrectlyForSingleRoot() {
        final double a = 1, b = -2, c = 1;
        final double[] roots = {1};
        QuadraticEquation eq = new QuadraticEquation(a, b, c);
        Solution sol = eq.getSolution();

        assertEquals(Solution.Status.HAS_ROOTS, sol.getStatus());
        assertArrayEquals(roots, sol.getRoots(), DELTA);
    }

    @Test
    public void shouldWorkCorrectlyForTwoRoots() {
        final double a = 256, b = 288, c = 17;
        final double[] roots = {-1.0 / 16, -17.0 / 16};
        QuadraticEquation eq = new QuadraticEquation(a, b, c);
        Solution sol = eq.getSolution();

        assertEquals(Solution.Status.HAS_ROOTS, sol.getStatus());
        assertArrayEquals(roots, sol.getRoots(), DELTA);
    }

    @Test
    public void shouldWorkCorrectlyForZeroA() {
        final double a = 0, b = 288, c = 17;
        final double[] roots = {-17.0 / 288};
        QuadraticEquation eq = new QuadraticEquation(a, b, c);
        Solution sol = eq.getSolution();

        assertEquals(Solution.Status.HAS_ROOTS, sol.getStatus());
        assertArrayEquals(roots, sol.getRoots(), DELTA);
    }

    @Test
    public void shouldWorkCorrectlyForZeroAnB() {
        final double a = 0, b = 0, c = 17;

        QuadraticEquation eq = new QuadraticEquation(a, b, c);
        Solution sol = eq.getSolution();

        assertEquals(Solution.Status.NO_ROOTS_IN_REAL_NUMBERS, sol.getStatus());
        assertArrayEquals(null, sol.getRoots(), DELTA);
    }
}
