package com.edu_netcracker.nn.adlitsov.ui.homework2;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MainServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String coeffs = request.getParameter("coeffs");
            QuadraticEquation equation = mapper.readValue(coeffs, QuadraticEquation.class);
            Solution solution = equation.getSolution();
            response.setContentType("application/json");
            response.setHeader("Cache-Control", "no-cache");
            response.getWriter().write(mapper.writeValueAsString(solution));
        } catch (JsonParseException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        } catch (JsonMappingException e) {
            e.printStackTrace();
        }
    }
}
