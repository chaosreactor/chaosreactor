import { z } from "zod";

export const createBlockSchema = z.object({
  type: z.string({
    required_error: "type is required",
  }),
  x: z.number({
    required_error: "x coordinate is required",
  }),
  y: z.number({
    required_error: "y coordinate is required",
  }),
  data: z.object({}).optional(),
});

export const params = z.object({
  blockId: z.string(),
});

export const updateBlockSchema = z.object({
  params,
  body: z
    .object({
      type: z.string(),
      x: z.number(),
      y: z.number(),
      data: z.object({}),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateBlockInput = z.TypeOf<typeof createBlockSchema>;
export type UpdateBlockInput = z.TypeOf<typeof updateBlockSchema>;
