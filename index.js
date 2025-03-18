// server/index.ts
import express2 from "express";

// server/routes.ts
import { Router } from "express";

// shared/schema.ts
import { z } from "zod";
var testimonialSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  review: z.string(),
  rating: z.number().min(1).max(5),
  photoUrl: z.string().optional(),
  createdAt: z.string()
});
var insertTestimonialSchema = testimonialSchema.omit({
  id: true,
  createdAt: true
});
var blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
  createdAt: z.string()
});
var insertBlogPostSchema = blogPostSchema.omit({
  id: true,
  createdAt: true
});

// server/routes.ts
var router = Router();
var testimonials = [
  {
    id: "1",
    clientName: "\u041C\u0430\u0440\u0438\u044F \u041F\u043E\u043B\u0443\u044D\u043A\u0442\u043E\u0432\u0430",
    review: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u041A\u0430\u0442\u044E\u0448\u0435 \u0437\u0430 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043C\u043E\u0435\u0439 \u0434\u0430\u0432\u043D\u0435\u0439 \u0437\u0430\u0442\u0435\u0438. \u0417\u0430\u043C\u044B\u0448\u043B\u044F\u043B\u0430 \u044D\u0442\u043E \u0432\u0441\u0451 \u044F \u043E\u043A\u043E\u043B\u043E \u0433\u043E\u0434\u0430, \u043E\u0431\u0441\u0443\u0434\u0438\u043B\u0438 \u0441 \u041A\u0430\u0442\u0435\u0439 \u0432\u0441\u0435 \u0442\u043E\u043D\u043A\u043E\u0441\u0442\u0438, \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B\u0438 \u0448\u0440\u0438\u0444\u0442 \u0438 \u0440\u0430\u0437\u043C\u0435\u0440. \u041E\u043D\u0430 \u043E\u0447\u0435\u043D\u044C \u0442\u0440\u0435\u043F\u0435\u0442\u043D\u043E \u043F\u043E\u0434\u043E\u0448\u043B\u0430 \u043A \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u044B\u0432\u0430\u043D\u0438\u044E \u043C\u043E\u0435\u0439 \u0437\u0430\u0434\u0443\u043C\u043A\u0438. \u0411\u044B\u043B\u043E \u043D\u0435 \u0431\u043E\u043B\u044C\u043D\u043E , \u0432\u0435\u0441\u0435\u043B\u043E, \u0430 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043A\u0440\u0443\u0442\u043E\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u2764",
    rating: 5,
    photoUrl: "https://sun6-22.userapi.com/s/v1/ig2/38kLNsCRdOwOfwq-PT98y7HtY5tfQymS-062HPf8fpoK1zVe96F65D1gDoCCse2-KYg-NcfGGPXSiq4nj1iRAmbA.jpg?quality=95&crop=0,195,1080,1080&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=50x50",
    createdAt: "2024-04-07T22:14:00.000Z"
  },
  {
    id: "2",
    clientName: "\u041A\u0441\u0435\u043D\u0438\u044F \u041F\u0438\u0441\u043A\u0443\u043D",
    review: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u041A\u0430\u0442\u044E\u0448\u0435 \u0437\u0430 \u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u0443\u044E \u0440\u0430\u0431\u043E\u0442\u0443\u{1F60D}\u{1F60D}\u{1F60D} \u0411\u0435\u0437\u0443\u043C\u043D\u043E \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u0430 \u0442\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u043E\u0439, \u0440\u0430\u0434\u043E\u0441\u0442\u0438 \u043D\u0435\u0442 \u043F\u0440\u0435\u0434\u0435\u043B\u0430! \u0421\u0434\u0435\u043B\u0430\u043B\u0430 \u0431\u044B\u0441\u0442\u0440\u043E \u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E, \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0431\u0435\u0437\u0431\u043E\u043B\u0435\u0437\u043D\u0435\u043D\u043D\u043E. \u042D\u0442\u043E \u0432\u0442\u043E\u0440\u0430\u044F \u0442\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u044F \u043D\u0430\u0431\u0438\u043B\u0430 \u0443 \u043D\u0435\u0451,\u0438 \u043E\u0434\u043D\u043E\u0437\u043D\u0430\u0447\u043D\u043E \u043F\u0440\u0438\u0434\u0443 \u0435\u0449\u0451!",
    rating: 5,
    photoUrl: "https://sun6-22.userapi.com/s/v1/ig2/Ij6O9G1GeWDQ92pXNgCC_r28anHOS978ZimhXm_sTiHvvXWWE2LsdYQzoNdX1wa5h7sHR3c1iXk9it1xF99ftgFk.jpg?quality=95&crop=0,267,1706,1706&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=50x50",
    createdAt: "2024-04-07T12:19:00.000Z"
  },
  {
    id: "3",
    clientName: "\u041C\u0430\u0440\u0438\u043D\u0430 \u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440\u043E\u0432\u043D\u0430",
    review: "\u0425\u043E\u0447\u0443 \u0441\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u043F\u0430\u0441\u0438\u0431\u043E \u041A\u0430\u0442\u0435 \u0437\u0430 \u043F\u0440\u043E\u0434\u0435\u043B\u0430\u043D\u043D\u0443\u044E \u0440\u0430\u0431\u043E\u0442\u0443! \u0422\u0430\u0442\u0443 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C - \u043F\u0440\u043E\u0441\u0442\u043E \u0431\u043E\u043C\u0431\u0430\u{1F525}\u0432\u0441\u0435 \u0447\u0435\u0442\u043A\u043E \u0438 \u043A\u0440\u0430\u0441\u0438\u0432\u043E. \u0415\u0441\u043B\u0438 \u043A\u0442\u043E-\u0442\u043E \u0438\u0449\u0435\u0442 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u0430 \u043F\u043E \u0442\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u0430\u043C, \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430 \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u043E\u0442 \u0447\u0435\u043B\u043E\u0432\u0435\u043A) \u042F \u043E\u0441\u0442\u0430\u043B\u0430\u0441\u044C \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u0430 \u043D\u0430 \u0432\u0441\u0435 110%, \u0432\u0441\u0435\u043C \u0441\u043E\u0432\u0435\u0442\u0443\u044E \u{1F609}",
    rating: 5,
    photoUrl: "https://sun6-22.userapi.com/s/v1/ig2/q7O1B0fsYUUUMdzJLEgDb1S9HcX1XJMBX00IM9T--qDznTUNIYYdbxGn_0owVyRcaJVa3FdJEtUK4i5WamkT4jfF.jpg?quality=95&crop=329,625,984,984&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=50x50",
    createdAt: "2024-04-25T13:59:00.000Z"
  },
  {
    id: "4",
    clientName: "\u042E\u043B\u0438\u044F \u0412\u0435\u0440\u043B\u0438\u043D\u0433\u0435\u0440",
    review: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u041A\u0430\u0442\u0435 \u0437\u0430 \u043C\u043E\u044E \u0448\u0435\u0441\u0442\u0443\u044E \u043B\u044E\u0431\u043E\u0432\u044C!!! \u0412\u0441\u0435 \u0448\u0435\u0441\u0442\u044C \u0442\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043E\u043A \u044F \u0434\u0435\u043B\u0430\u043B\u0430 \u0443 \u044D\u0442\u043E \u043C\u0430\u0441\u0442\u0435\u0440\u0430 , \u0431\u0435\u0437\u0443\u043C\u043D\u043E \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u0435 \u0438 \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u044B\u0435. \u0422\u0430\u043A\u0436\u0435 \u0441\u0434\u0435\u043B\u0430\u043B\u0438 \u043A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044E \u0442\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u0438 \u0441 \u0442\u043E\u043D\u043A\u0438\u043C \u043A\u043E\u043D\u0442\u0443\u0440\u043E\u043C \u0441\u043F\u0443\u0441\u0442\u044F \u043F\u043E\u043B \u0433\u043E\u0434\u0430 , \u0432\u044B\u0448\u043B\u043E \u0431\u043E\u043C\u0431\u0435\u0437\u043D\u043E\u{1F9E8}\u{1F9E8}\u{1F9E8} \u041F\u0440\u0438\u0434\u0443 \u0435\u0449\u0451 \u043D\u0435 \u0440\u0430\u0437\u{1F90D}",
    rating: 5,
    photoUrl: "https://sun6-22.userapi.com/s/v1/ig2/6wo5FmEGw21KYuHpsbi4023OPLrEtt8CqRUzAkkRcWfj_7iLj9mq9ygQv734lL3fpi59ZJA4ACcfFz84EmbuJq5n.jpg?quality=95&crop=80,65,673,673&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=50x50",
    createdAt: "2024-04-27T15:49:00.000Z"
  },
  {
    id: "5",
    clientName: "\u041A\u0441\u0435\u043D\u0438\u044F \u0421\u0438\u0434\u043E\u0440\u043E\u0432\u0430",
    review: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430 - \u043C\u0430\u0441\u0442\u0435\u0440 \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u0435\u043B\u0430. \u041E\u0447\u0435\u043D\u044C \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0438 \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0434\u043E\u0448\u043B\u0430 \u043A \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0443. \u0421\u0442\u0443\u0434\u0438\u044F \u0447\u0438\u0441\u0442\u0430\u044F, \u0432\u0441\u0451 \u0441\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u043E, \u0438\u0433\u0440\u0430\u0435\u0442 \u043C\u0443\u0437\u044B\u043A\u0430, \u0437\u0430 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0430\u043C\u0438 \u0432\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u043E\u0447\u0435\u043D\u044C \u0431\u044B\u0441\u0442\u0440\u043E! \u0423 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u044B \u043D\u0430\u0431\u0438\u043B\u0430 \u0434\u0432\u0435 \u0442\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u0438! \u042F \u0440\u0430\u0434\u0430 \u0447\u0442\u043E \u043F\u043E\u043F\u0430\u043B\u0430 \u043A \u0442\u0430\u043A\u043E\u043C\u0443 \u0437\u0430\u043C\u0435\u0447\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u043C\u0443 \u043C\u0430\u0441\u0442\u0435\u0440\u0443!",
    rating: 5,
    photoUrl: "https://sun6-22.userapi.com/s/v1/ig2/4n-v_-aqut0wT0ujH7OueyV7HlK-SQSHK1CPWtFg71SLAnGOPx2DDpIeb8rcqn8t1OoK1JB-Z5lDAUbjhdOij5ux.jpg?quality=95&crop=0,347,1920,1920&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=50x50",
    createdAt: "2024-04-07T16:41:00.000Z"
  },
  {
    id: "6",
    clientName: "\u0410\u043D\u0430\u0441\u0442\u0430\u0441\u0438\u044F \u0412\u044B\u0431\u043E\u0440\u043E\u0432\u0430",
    review: "\u041A\u0430\u0442\u044E\u0448\u0430 - \u043C\u0430\u0441\u0442\u0435\u0440 \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u0435\u043B\u0430. \u0415\u0439 \u043E\u0447\u0435\u043D\u044C \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u0442\u043E, \u0447\u0435\u043C \u043E\u043D\u0430 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F. \u041E\u043D\u0430 \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0432\u043E \u0432\u0441\u0435\u0445 \u0442\u043E\u043D\u043A\u043E\u0441\u0442\u044F\u0445, \u041F\u043E\u0434\u043E\u0431\u0440\u0430\u043B\u0438 \u0432\u043C\u0435\u0441\u0442\u0435 \u044D\u0441\u043A\u0438\u0437. \u041F\u043E\u0441\u043B\u0435 \u0441\u0435\u0430\u043D\u0441\u0430 \u0443\u0433\u043E\u0441\u0442\u0438\u043B\u0438 \u0447\u0430\u0435\u043C )), \u0434\u0430\u043B\u0438 \u0437\u0430\u0436\u0438\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043A\u0440\u0435\u043C, \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438 \u043A\u0430\u043A \u0443\u0445\u0430\u0436\u0438\u0432\u0430\u0442\u044C \u0437\u0430 \u0442\u0430\u0442\u0443.\u2764",
    rating: 5,
    photoUrl: "https://sun6-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&cs=50x50",
    createdAt: "2024-04-07T16:41:00.000Z"
  },
  {
    id: "7",
    clientName: "\u041A\u0438\u0440\u0430 \u042F\u0440\u043E\u0448",
    review: "\u041A\u0430\u0442\u044F \u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u043C\u0430\u0441\u0442\u0435\u0440. \u0423\u0447\u043B\u0430 \u0432\u0441\u0435 \u043C\u043E\u0438 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F, \u0440\u0430\u0431\u043E\u0442\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430 \u043E\u0447\u0435\u043D\u044C \u043A\u0440\u0430\u0441\u0438\u0432\u043E \u0438 \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E. \u041A\u043B\u0430\u0441\u0441\u043D\u0430\u044F \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430, \u0437\u0430\u0431\u043E\u0442\u0430 \u0438 \u043F\u0440\u0438\u044F\u0442\u043D\u0430\u044F \u0431\u0435\u0441\u0435\u0434\u0430 - \u0432\u0441\u0435 \u0434\u043B\u044F \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430. \u0415\u0441\u043B\u0438 \u0440\u0430\u0437\u0434\u0443\u043C\u044B\u0432\u0430\u0435\u0442\u0435 \u043D\u0430\u0441\u0447\u0435\u0442 \u043C\u0430\u0441\u0442\u0435\u0440\u0430, \u0442\u043E \u0441\u043C\u0435\u043B\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0435\u0435",
    rating: 5,
    photoUrl: "https://sun6-21.userapi.com/s/v1/ig2/H5GBCKxNAATL3k0_A4b0Vfxp3nG7rhOy2XT-akqMWAgszZa5KFBGssYBUgl8za9igaOebrGy25UMU32hxGLLYrZL.jpg?quality=96&crop=0,410,1434,1434&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=50x50",
    createdAt: "2024-08-22T17:19:00.000Z"
  },
  {
    id: "8",
    clientName: "\u041F\u043E\u043B\u044F \u0413\u0440\u043E\u043C\u043E\u0432\u0430",
    review: "\u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0431\u0443\u0434\u0435\u0442 \u0441\u0442\u043E\u044F\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u043F\u0435\u0440\u0435\u0434 \u043A\u0430\u043A\u0438\u043C \u043D\u0438\u0431\u0443\u0434\u044C \u0434\u0440\u0443\u0433\u0438\u043C \u043C\u0430\u0441\u0442\u0435\u0440\u043E\u043C \u0438 \u043C\u0430\u0441\u0442\u0435\u0440\u043E\u043C \u041A\u0430\u0442\u0435\u0439, \u0432\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u041A\u0430\u0442\u044E\u{1F970}\u0441\u043A\u0438\u043D\u0443\u043B\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443 \u0442\u043E\u0433\u043E \u0447\u0435\u0433\u043E \u0445\u043E\u0447\u0443, \u0432\u0441\u0451 \u043E\u0431\u0441\u0443\u0434\u0438\u043B\u0438 \u043E\u0442 \u0438 \u0434\u043E, \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B\u0438 \u0440\u0430\u0437\u043C\u0435\u0440\u{1F929}",
    rating: 5,
    photoUrl: "https://sun9-10.userapi.com/s/v1/ig2/JjqkgtBrwq-2hASsU3X6o6DXVymkSkplgcE1k-p2zE2RYrPPKwMdjfoTTWWFeKl7vf75wQ15GzXUGHlmyJ2eGRJf.jpg?quality=95&crop=0,1,1920,1920&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=50x50",
    createdAt: "2024-04-07T16:41:00.000Z"
  }
];
router.get("/api/testimonials", (req, res) => {
  res.json(testimonials);
});
router.post("/api/testimonials", async (req, res) => {
  try {
    const newTestimonial = insertTestimonialSchema.parse(req.body);
    const testimonial = {
      ...newTestimonial,
      id: Date.now().toString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    testimonials.push(testimonial);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ error: "Invalid testimonial data" });
  }
});
function registerRoutes(app2) {
  app2.use(router);
  return app2;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  app.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
