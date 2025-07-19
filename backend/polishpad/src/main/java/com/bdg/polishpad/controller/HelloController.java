package com.bdg.polishpad.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/hello")
public class HelloController {
  @GetMapping("/hello")
  public String hello() {
      return "Is running";
  }
}
