import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BlogAdmin from './BlogAdmin';
import BlogEditorEnhanced from './BlogEditorEnhanced';

const BlogDashboard = () => {
  return (
    <Routes>
      <Route index element={<BlogAdmin />} />
      <Route path="new" element={<BlogEditorEnhanced />} />
      <Route path="edit/:id" element={<BlogEditorEnhanced />} />
      <Route path="*" element={<Navigate to="/admin/blog" replace />} />
    </Routes>
  );
};

export default BlogDashboard;