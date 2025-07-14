package com.elhabhab.backend.service.user.invoicee;

import com.elhabhab.backend.dto.response.InvoiceResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InvoiceService {
    List<InvoiceResponseDTO> getAllInvoices();  // Liste sans pagination
    Page<InvoiceResponseDTO> getInvoicesPage(Pageable pageable);  // Avec pagination
}