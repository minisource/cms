import api from './axios'; // مسیر Axios instance
import { TArticle } from '../types/strapi-types'; // مسیر Typeها

export async function testConnection() {
  try {
    const res = await api.get<TArticle[]>('/articles?populate=category');
    console.log('تعداد مقالات:', res.data.data.length);
    console.log('اولین مقاله:', res.data.data[0]);
  } catch (error) {
    console.error('ارتباط با Strapi برقرار نشد:', error);
  }
}
