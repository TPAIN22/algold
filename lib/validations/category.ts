import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "يجب أن يحتوي اسم الفئة على حرفين على الأقل"),
  slug: z.string().min(2, "يجب أن يحتوي المعرف على حرفين على الأقل"),
  image_url: z.string().optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
