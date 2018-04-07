package com.edu_netcracker.nn.adlitsov.ui.homework2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MainServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String coeffs = request.getParameter("coeffs");
        QuadraticEquation equation = mapper.readValue(coeffs, QuadraticEquation.class);
        Solution solution = equation.getSolution();
        response.setContentType("application/json");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().write(mapper.writeValueAsString(solution));
    }
}
