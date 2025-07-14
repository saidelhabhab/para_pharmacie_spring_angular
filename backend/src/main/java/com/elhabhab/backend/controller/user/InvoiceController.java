package com.elhabhab.backend.controller.user;

import com.elhabhab.backend.dto.response.InvoiceResponseDTO;
import com.elhabhab.backend.service.user.invoicee.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    // 🔸 Liste sans pagination
    @GetMapping
    public ResponseEntity<List<InvoiceResponseDTO>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    // 🔸 Liste avec pagination
    @GetMapping("/page")
    public ResponseEntity<Page<InvoiceResponseDTO>> getInvoicesPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("invoiceDate").descending());
        return ResponseEntity.ok(invoiceService.getInvoicesPage(pageable));
    }
}
