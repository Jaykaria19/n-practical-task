"use client"
import React from 'react'
import { TextField, Button, Container, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().required('Price is required'),
  discount: yup.number().required('Discount is required'),
  rating: yup.number().required('Rating is required'),
  stock: yup.number().required('Stock is required'),
  brand: yup.string().required('Brand is required'),
  images: yup
    .mixed()
    .test('fileSize', 'Maximum of 5 images allowed', (value) => {
      return value ? value.length <= 5 : true;
    })
    .test('fileSize', 'At least 1 image required', (value) => {
      return value ? value.length >= 1 : false;
    }),
});

const NewProductForm = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      price: '',
      discount: '',
      rating: '',
      stock: '',
      brand: '',
      images:[],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://dummyjson.com/products/add', values);

        if (response.status === 200) {
          console.log('Product created successfully');
         
        } else {
          console.error('Failed to create product');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    },

  });
  return (
    <Container maxWidth="md" className="py-8">
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Create a new product</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
              fullWidth
              label="Title"
              variant="outlined"
              {...formik.getFieldProps('title')}
              error={formik.touched.title && formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              fullWidth
              label="Category"
              variant="outlined"
              {...formik.getFieldProps('category')}
              error={formik.touched.category && formik.errors.category}
              helperText={formik.touched.category && formik.errors.category}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              fullWidth
              label="Price"
              variant="outlined"
              {...formik.getFieldProps('price')}
              error={formik.touched.price && formik.errors.price}
              helperText={formik.touched.price && formik.errors.price}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          
          <TextField
              fullWidth
              label="Discount"
              variant="outlined"
              {...formik.getFieldProps('discount')}
              error={formik.touched.discount && formik.errors.discount}
              helperText={formik.touched.discount && formik.errors.discount}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          
          <TextField
              fullWidth
              label="Rating"
              variant="outlined"
              {...formik.getFieldProps('rating')}
              error={formik.touched.rating && formik.errors.rating}
              helperText={formik.touched.rating && formik.errors.rating}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              fullWidth
              label="Stock"
              variant="outlined"
              {...formik.getFieldProps('stock')}
              error={formik.touched.stock && formik.errors.stock}
              helperText={formik.touched.stock && formik.errors.stock}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              fullWidth
              label="Brand"
              variant="outlined"
              {...formik.getFieldProps('brand')}
              error={formik.touched.brand && formik.errors.brand}
              helperText={formik.touched.brand && formik.errors.brand}
            />
        </Grid>
        <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) =>
                formik.setFieldValue('images', event.target.files)
              }
            />
            {formik.touched.images && formik.errors.images && (
              <div className="text-red-500">{formik.errors.images}</div>
            )}
          </Grid>
      </Grid>
      <Button  color="primary" variant='outlined' type='submit'>
        Create Product
      </Button>
    </form>
  </Container>
);
};

export default NewProductForm