package com.mriduava.anbud.dtos;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class AuctionSocketDTO {
    public String action;
    public Object payload;
}
