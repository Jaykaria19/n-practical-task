"use client"
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Get_Product = 'https://dummyjson.com/products?limit=10';

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Get_Product}&skip=${page * rowsPerPage}`);
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (productId) => {
    router.push(`/product-details/${productId}`);
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  return (
    <>
    {loading ? (
        <CircularProgress className='block m-auto' />
    ):
    (
        <div>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title (Thumb Image)</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Brand</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map((product) => (
                <TableRow key={product.id} onClick={() => handleRowClick(product.id)} className='cursor-pointer'>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.discountPercentage}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                </TableRow>
                ))}
                
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={100}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
    )}
    </>
  );
}

export default ProductList;
