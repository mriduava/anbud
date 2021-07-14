package com.mriduava.anbud.controllers;

import com.mriduava.anbud.entities.AuctionItem;
import com.mriduava.anbud.services.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/auctions")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    @GetMapping
    public List<AuctionItem> getAllItems() {
        return auctionService.getAllItems();
    }

    @GetMapping("/{id}")
    public Optional<AuctionItem> getOneItem(@PathVariable Long id) {
        return auctionService.getOneItem(id);
    }

    @PostMapping
    public ResponseEntity<Boolean> postNewAuction(@RequestBody AuctionItem auctionItem) {
        boolean isSaved = auctionService.postNewAuction(auctionItem);
        return ResponseEntity.ok(isSaved);
    }
}
