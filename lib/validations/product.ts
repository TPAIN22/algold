import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "يجب أن يحتوي اسم المنتج على حرفين على الأقل"),
  slug: z.string().min(2, "يجب أن يحتوي المعرف على حرفين على الأقل"),
  description: z.string().optional(),
  price: z.coerce.number().positive("يجب أن يكون السعر رقماً موجباً"),
  category_id: z.string().optional().nullable(),
  in_stock: z.boolean().default(true),
  featured: z.boolean().default(false),
  image_url: z.string().optional().nullable(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
