package com.mriduava.anbud.repositories;

import com.mriduava.anbud.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepo extends JpaRepository<Bid, Long> {
}
