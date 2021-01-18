package com.mriduava.anbud.repositories;

import com.mriduava.anbud.entities.AuctionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepo extends JpaRepository<AuctionItem, Long> {
}
