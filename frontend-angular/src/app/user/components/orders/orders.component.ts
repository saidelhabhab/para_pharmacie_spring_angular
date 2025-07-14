import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrderResponseDTO } from 'src/app/interface/order-response-dto';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'orderDate', 'items', 'totalAmount', 'status', 'actions'];
  dataSource = new MatTableDataSource<OrderResponseDTO>();
  isLoading = true;
  userId : string = '90369cb4-851a-418c-bbfc-04e848738779';

 
  searchTerm: string = '';
  allOrders: OrderResponseDTO[] = [];
  filteredOrders: OrderResponseDTO[] = [];

  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  selectedOrder?: OrderResponseDTO;


  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadOrders(this.currentPage);
  }

  loadOrders(page: number): void {
    this.isLoading = true;
    this.orderService.getOrdersByUserPaginated(this.userId, page, this.pageSize).subscribe({
      next: (res) => {
        console.log('data ==> ', res);
        this.dataSource.data = res.content;
        this.allOrders = res.content;
        this.filteredOrders = [...this.allOrders];
        this.totalElements = res.totalElements;
        this.currentPage = res.number;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.isLoading = false;
      }
    });
  }

 onSearchChange(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredOrders = [...this.allOrders];
    } else {
      this.filteredOrders = this.allOrders.filter(order =>
        order.orderId?.toLowerCase().includes(term) ||
        order.status?.toLowerCase().includes(term) ||
        order.items?.some(item =>
          item.productName?.toLowerCase().includes(term)
        )
      );
    }

    // Mets à jour la datasource du tableau pour que ça s'affiche
    this.dataSource.data = this.filteredOrders;
  }


  // You can implement these as needed
  deleteAllOrders(): void {
    console.log('Delete all clicked');
  }

 
  viewOrderDetails(order: OrderResponseDTO): void {
    this.dialog.open(OrderDetailsComponent, {
      width: '800px',
      data: { order },
    });
  }

  formatOrderDate(orderDateArray: number[]): Date {
    if (!orderDateArray || orderDateArray.length < 6) return new Date();

    const [year, month, day, hour, minute, second] = orderDateArray;
    return new Date(year, month - 1, day, hour, minute, second); // mois = month - 1
  }

}
