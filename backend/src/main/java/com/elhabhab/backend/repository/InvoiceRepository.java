package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.Invoice;
import com.elhabhab.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findByInvoiceId(UUID invoiceId);

    Optional<Invoice> findByOrder(Order order);

}