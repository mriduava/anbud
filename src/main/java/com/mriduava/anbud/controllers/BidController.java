package com.mriduava.anbud.controllers;

import com.mriduava.anbud.entities.Bid;
import com.mriduava.anbud.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class BidController {

    @Autowired
    BidService bidService;

    @GetMapping("/rest/bids")
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

   /* @GetMapping("/rest/bids/{id}")
    public Optional<Bid> getOneBid(@PathVariable Long id) {
        return bidService.getBidById(id);
    }*/

    @PostMapping("/rest/bids")
    public Bid postNewBid(@RequestBody Bid bid) {
        var isSaved = bidService.postNewBid(bid);
        return bidService.postNewBid(bid);
    }

    @GetMapping("/rest/bids/{auctionId}")
    public ResponseEntity<List<Bid>> getAllBidsByAuctionId(@PathVariable long auctionId) {
        var bids = bidService.findBidsByAuctionId(auctionId);
        return ResponseEntity.ok(bids);
    }

    /*@GetMapping("/rest/auctionswithbids")
    public List<Bid> getAllAuctionsWithBids() {
        return bidService.getAuctionWithBids();
    }*/
}
