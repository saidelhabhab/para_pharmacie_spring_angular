package com.elhabhab.backend.service.user.invoicee;

import com.elhabhab.backend.dto.response.InvoiceResponseDTO;
import com.elhabhab.backend.mapper.InvoiceMapper;
import com.elhabhab.backend.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper; // Mapper DTO <-> Entity

    @Override
    public List<InvoiceResponseDTO> getAllInvoices() {
        return invoiceRepository.findAll()
                .stream()
                .map(invoiceMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<InvoiceResponseDTO> getInvoicesPage(Pageable pageable) {
        return invoiceRepository.findAll(pageable)
                .map(invoiceMapper::toDto);
    }
}
