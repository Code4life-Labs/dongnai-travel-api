// init.js

// Get env
let database = "DongNaiTravel";

// Create user
// db.createUser({
//   user: "root",
//   pwd: "letmein12345",
//   roles: [{ role: "root", db: database }],
// });

// Create or switch to database
instance = db.getSiblingDB(database);

// Create collections
instance.createCollection("Users");
instance.createCollection("UserRoles");
instance.createCollection("Follows");
instance.createCollection("Places");
instance.createCollection("Blogs");
instance.createCollection("PlaceTypes");
instance.createCollection("BlogTypes");
instance.createCollection("BlogComments");
instance.createCollection("BusinessStatuses");
instance.createCollection("PlaceReviews");
instance.createCollection("UserFavoritedPlaces");
instance.createCollection("UserFavoritedBlogs");
instance.createCollection("UserVisitedPlaces");
instance.createCollection("Otps");

// Init data
// UserRoles
const userRoles = [
  {
    _id: ObjectId(),
    name: "Admin",
    value: "admin",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "User",
    value: "user",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
];

// Users
const users = [
  {
    _id: ObjectId("67adafec11c0293b5ae4326b"),
    roleId: userRoles[1]._id,
    firstName: "Tuan",
    lastName: "Nguyen Anh",
    email: "nguyenanhtuan19122002@gmail.com",
    username: "anhtuan",
    hashedPassword:
      "$2a$12$Uxfwn0iyKd6cSz47QtCgNO6u00Qc7Uc15wuet5P3PVONcL5.9uq0C",
    displayName: "Tuan Nguyen Anh",
    birthday: new Date("12-19-2002").getTime(),
    avatar: "",
    isVerified: true,
    coverPhoto: "",
    updatedAt: new Date("01-02-2025").getTime(),
    createdAt: new Date("01-02-2025").getTime(),
  },
  {
    _id: ObjectId("67afe7f0220219bdbb57f24f"),
    roleId: userRoles[1]._id,
    firstName: "Tonny",
    lastName: "Nguyen",
    email: "testuser1@gmail.com",
    username: "tonnynguyen",
    hashedPassword:
      "$2a$12$Uxfwn0iyKd6cSz47QtCgNO6u00Qc7Uc15wuet5P3PVONcL5.9uq0C",
    displayName: "Tonny Nguyen",
    birthday: new Date("12-19-2002").getTime(),
    avatar: "",
    isVerified: true,
    coverPhoto: "",
    updatedAt: new Date("01-02-2025").getTime(),
    createdAt: new Date("01-02-2025").getTime(),
  },
  {
    _id: ObjectId("67b68015d72ca4549c4ada42"),
    roleId: userRoles[1]._id,
    firstName: "Unverified",
    lastName: "User",
    email: "testuser2@gmail.com",
    username: "testuser",
    hashedPassword:
      "$2a$12$Uxfwn0iyKd6cSz47QtCgNO6u00Qc7Uc15wuet5P3PVONcL5.9uq0C",
    displayName: "Tonny Nguyen",
    birthday: new Date("12-19-2002").getTime(),
    avatar: "",
    isVerified: false,
    coverPhoto: "",
    updatedAt: new Date("01-02-2025").getTime(),
    createdAt: new Date("01-02-2025").getTime(),
  },
  {
    _id: ObjectId("67d42c566073c0868c92d3b4"),
    roleId: userRoles[0]._id,
    firstName: "Tuan",
    lastName: "Nguyen Anh",
    email: "admin@gmail.com",
    username: "adminuser",
    hashedPassword:
      "$2a$12$Uxfwn0iyKd6cSz47QtCgNO6u00Qc7Uc15wuet5P3PVONcL5.9uq0C",
    displayName: "Nguyen Anh Tuan",
    birthday: new Date("12-19-2002").getTime(),
    avatar: "",
    isVerified: true,
    coverPhoto: "",
    updatedAt: new Date("01-02-2025").getTime(),
    createdAt: new Date("01-02-2025").getTime(),
  },
];

// PlaceTypes
const placeTypes = [
  {
    _id: ObjectId(),
    name: "Amusement park",
    value: "amusement_park",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Restaurant",
    value: "restaurant",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Resort",
    value: "resort",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Homestay",
    value: "homestay",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Lodging",
    value: "lodging",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Guest house",
    value: "guest_house",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Hotel",
    value: "hotel",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Campground",
    value: "campground",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Scenic spots",
    value: "scenic_spots",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Tourist area",
    value: "tourist_area",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Ecotourism",
    value: "ecotourism",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Park",
    value: "park",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Place of worship",
    value: "place_of_worship",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Coffee shop",
    value: "coffee_shop",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
];

// BlogTypes
const blogTypes = [
  {
    _id: ObjectId(),
    name: "Review",
    value: "review",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Rank",
    value: "rank",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Introduction",
    value: "introduction",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
];

// BusinessStatuses
const businessStatuses = [
  {
    _id: ObjectId(),
    name: "Closed temporarily",
    value: "closed_temporarily",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId(),
    name: "Operational",
    value: "operational",
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
];

// Places
const places = [
  {
    _id: ObjectId("642bd476b64f3e8ad215c315"),
    geometry: {
      location: {
        lat: 11.2309993,
        lng: 107.4401813,
      },
      viewport: {
        northeast: {
          lat: 11.2325342302915,
          lng: 107.4410102802915,
        },
        southwest: {
          lat: 11.2298362697085,
          lng: 107.4383123197085,
        },
      },
    },
    name: "Công viên Suối Mơ",
    url: "https://maps.google.com/?cid=2437631735449436984",
    website: "http://suoimopark.com/",
    isRecommended: true,
    phoneNumber: "0251 6270 777",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594035/place_photos/s5bvmqf9pzwrjcghdxmb.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594033/place_photos/pe2bbcgyfwywkvd5rmht.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594034/place_photos/nq0oumm3lwiq7jjx9asx.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594034/place_photos/wcorybpi5jx7ypornjpq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594034/place_photos/xudphwc6hto4yqfd2z36.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594036/place_photos/hwk2jqxlwpdmphw5xxof.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594033/place_photos/ptcowq7g2gmuh4b2j5qc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594034/place_photos/civbz0zfbavfunhaj3wu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594033/place_photos/r5jld9d1zobnm5qsspyi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594034/place_photos/lmnv52qeqqjj4vu43hsp.jpg",
    ],
    placeId: "ChIJPUHe5ahndDEROMOu9CU11CE",
    plusCode: {
      compoundCode: "6CJR+93 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P396CJR+93",
    },
    addressComponents: [
      {
        longName: "9",
        shortName: "9",
        types: ["street_number"],
      },
      {
        longName: "Trà Cổ",
        shortName: "Trà Cổ",
        types: ["route"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["amusement_park"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642bd709b64f3e8ad215c31b"),
    geometry: {
      location: {
        lat: 10.8319202,
        lng: 106.9358127,
      },
      viewport: {
        northeast: {
          lat: 10.8332730802915,
          lng: 106.9372396302915,
        },
        southwest: {
          lat: 10.8305751197085,
          lng: 106.9345416697085,
        },
      },
    },
    name: "Mekong Long Thành Resort & Reststop",
    url: "https://maps.google.com/?cid=10555773058441866879",
    website: "https://mekongrestaurant.vn/",
    isRecommended: true,
    phoneNumber: "090 239 39 35",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594693/place_photos/irzqeq7xrpzt49nhahr4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594694/place_photos/rujfcjztepdunvbocq93.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594694/place_photos/o1bjb3i20mbmjnuszfqi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594693/place_photos/jilrcwt4wrh2lqr4smgy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594694/place_photos/y0jmheqfvv2ew9xhdxub.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594694/place_photos/sm915fipogdkg0umlmjg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594693/place_photos/pwn8bomtovajkys0juyj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594693/place_photos/kdzkzitmws1ste02vzq5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594694/place_photos/t7zutd6ld7x0rur4nhky.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680594693/place_photos/yaahvqycvi20ps4zgfjy.jpg",
    ],
    placeId: "ChIJ--F10acfdTERf-4QdqujfZI",
    plusCode: {
      compoundCode: "RWJP+Q8 Long Thành, Đồng Nai, Việt Nam",
      globalCode: "7P28RWJP+Q8",
    },
    addressComponents: [
      {
        longName: "Quốc lộ 51",
        shortName: "QL51",
        types: ["route"],
      },
      {
        longName: "An Phước",
        shortName: "An Phước",
        types: ["sublocality_level_1", "sublocality", "political"],
      },
      {
        longName: "Long Thành",
        shortName: "Long Thành",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["resort"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642bd8ceb64f3e8ad215c31e"),
    geometry: {
      location: {
        lat: 11.4195459,
        lng: 107.4513418,
      },
      viewport: {
        northeast: {
          lat: 11.4209021302915,
          lng: 107.4526664302915,
        },
        southwest: {
          lat: 11.4182041697085,
          lng: 107.4499684697085,
        },
      },
    },
    name: "Cat Tien Bridge Homestay",
    url: "https://maps.google.com/?cid=15007669317473423474",
    isRecommended: true,
    website: null,
    phoneNumber: "0387 629 573",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595148/place_photos/jdkatsuqkobvotwl7qdt.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595146/place_photos/iqjlzyztoz7hxvz5jn9l.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595147/place_photos/t3n4wlbs6cwm2ux4csxe.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595146/place_photos/wclyei1wnesp1nhzbdd0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595147/place_photos/qtij1uhjxods5bzlv3xe.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595147/place_photos/jdnvbj2gx9txfxsxv9g8.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595147/place_photos/zi63wja5drlgler29ifi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595147/place_photos/sbevrwr0rnsbugcuhq2b.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595148/place_photos/oegaulan7fgwdlqe3e4p.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680595147/place_photos/jsvjzwvy10dhraqvy8o7.jpg",
    ],
    placeId: "ChIJGfiYtGp6dDERclCI7rrzRdA",
    plusCode: {
      compoundCode: "CF92+RG Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CF92+RG",
    },
    addressComponents: [
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "Homestay có phong cách đơn giản, đúng chất vùng sông nước. Cat Tien Bridge Homestay là chỗ lưu trú lý tưởng dành cho du khách, tọa lạc ngay bên bờ sông và chỉ cách Vườn Quốc Gia Cát Tiên 10 phút đạp xe thôi nhé! Như vậy, đây là vị trí rất thuận lợi để bạn cùng hội “yêu thương” của mình dễ dàng di chuyển đến các địa điểm du lịch nổi tiếng. Không gian ở đây khá yên tĩnh, thoải mái mang hương thơm của đồng nội nên  bạn sẽ có cảm giác đang trở về tuổi thơ với sông nước, đồng ruộng. Phòng ốc được decor đơn giản, nhưng không kém phần tinh tế. Nghỉ dưỡng ở đây, bạn sẽ cảm thấy thư thái, bình yên, quên đi mọi phiền muộn trong cuộc sống hằng ngày. Đồ dùng sinh hoạt đầy đủ, tiện ích và đặc biệt rất sạch sẽ.Homestay có view nhìn ra núi và cánh đồng nên không khí trong lành, dễ chịu. Phòng nào cũng có màn chống muỗi muỗi, phòng tắm có vòi hoa sen, dép đi trong nhà vệ sinh…Bạn và hội nhóm có thể tổ chức tiệc nướng BBQ với những món ăn đồng quê, thơm ngon, sạch sẽ. Ngoài ra, bạn cũng có thể tham gia các hoạt động khám phá xung quanh, ví dụ như đi thuyền…",
      en: "The homestay features a simple, rustic style that captures the essence of the riverine region. Cat Tien Bridge Homestay is an ideal accommodation option for travelers, located right on the riverbank and only a 10-minute bike ride away from the Cat Tien National Park. Therefore, it is a convenient location for you and your 'loved ones' to easily travel to famous tourist destinations. The space here is quite peaceful, relaxing, and filled with the aroma of grass that takes you back to your childhood with rivers, fields, and farms. The rooms are simply decorated but refined. Staying here, you will feel relaxed, peaceful, and forget about all the troubles of daily life. The facilities are complete and especially clean. The homestay has views of the mountains and fields, providing a pleasant, fresh atmosphere. All rooms have mosquito nets, showers with showerheads, and indoor slippers. You and your group can organize a BBQ party with delicious, clean, and rustic dishes. Additionally, you can participate in various activities, such as boat trips...",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c2ddb61d4c74954bb9c2c"),
    geometry: {
      location: {
        lat: 10.9727103,
        lng: 106.8880451,
      },
      viewport: {
        northeast: {
          lat: 10.9740060802915,
          lng: 106.8893931302915,
        },
        southwest: {
          lat: 10.9713081197085,
          lng: 106.8866951697085,
        },
      },
    },
    name: "Lu Khach Quan Homestay",
    url: "https://maps.google.com/?cid=34645333067818946",
    website:
      "https://www.tripadvisor.co.uk/ShowUserReviews-g1749176-d3836897-r444945005-Lu_Khach_Quan-Bien_Hoa_Dong_Nai_Province.html",
    isRecommended: false,
    phoneNumber: "091 360 73 99",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680616906/place_photos/r0pgsvurkh2kq7agqh2m.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680616911/place_photos/z2x3a2mmol07vot62dzj.jpg",
    ],
    placeId: "ChIJHdP3qf7ddDERwuehMr8VewA",
    plusCode: {
      compoundCode: "XVFQ+36 Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XVFQ+36",
    },
    addressComponents: [
      {
        longName: "73A",
        shortName: "73A",
        types: ["street_number"],
      },
      {
        longName: "Nguyễn Ái Quốc",
        shortName: "Nguyễn Ái Quốc",
        types: ["route"],
      },
      {
        longName: "Khu Phố 2",
        shortName: "Khu Phố 2",
        types: ["neighborhood", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "76000",
        shortName: "76000",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c304461d4c74954bb9c30"),
    geometry: {
      location: {
        lat: 11.3871129,
        lng: 107.3512124,
      },
      viewport: {
        northeast: {
          lat: 11.3885809302915,
          lng: 107.3527858802915,
        },
        southwest: {
          lat: 11.3858829697085,
          lng: 107.3500879197085,
        },
      },
    },
    name: "Ta Lai Longhouse",
    url: "https://maps.google.com/?cid=11475809317726112114",
    website: "https://www.ta-lai-longhouse.com/",
    isRecommended: true,
    phoneNumber: "097 416 08 27",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617539/place_photos/fhatntgclzthb6sq6nld.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617538/place_photos/kgatastubuobgnbgwv3o.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617538/place_photos/srbhw2bwx83zjatmejk7.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617538/place_photos/xxhc3nwmeduaombuysns.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617538/place_photos/wxhamvkave4565jbhays.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617538/place_photos/vva9yieb2tkutvji164a.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617539/place_photos/jtmoblnn0tiubqtawcz9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617539/place_photos/xxauau0l8xebu7gqw2t6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617539/place_photos/ilmzcfoajnlchvail7hv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680617539/place_photos/odzy8plnemzwkbffwqbz.jpg",
    ],
    placeId: "ChIJIeynWOh8dDERcsku5cVDQp8",
    plusCode: {
      compoundCode: "99P2+RF Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P3999P2+RF",
    },
    addressComponents: [
      {
        longName: "Tà Lài",
        shortName: "Tà Lài",
        types: ["administrative_area_level_3", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c35ebe7994d2834125599"),
    geometry: {
      location: {
        lat: 11.1115043,
        lng: 106.9723578,
      },
      viewport: {
        northeast: {
          lat: 11.1127715802915,
          lng: 106.9737100802915,
        },
        southwest: {
          lat: 11.1100736197085,
          lng: 106.9710121197085,
        },
      },
    },
    name: "Bà Đất Eco Homestay - Your truly home",
    url: "https://maps.google.com/?cid=14221250019767621487",
    website: "http://www.badathomestay.vn/",
    isRecommended: false,
    phoneNumber: "091 952 77 00",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/g7qje85jyv5arp3ubyzz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/w48otvo74nmxnivn1hxv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/mqying57zla6r6xyfvk2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/wwpswddzsatm2ltbswg2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/jjqvmmgrkcrcj0lgmp6f.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/jbvgvrebytg4ruefgdy9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/h616uddixmtmqs785ql0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/nqrnxqaozkoiivkk8vpr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/g6bqfc2vjxnbc96zcdv1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680618985/place_photos/wevf7wehj4kacqgs5myc.jpg",
    ],
    placeId: "ChIJmVVVVRHqdDERbxdEqosHXMU",
    plusCode: {
      compoundCode: "4X6C+JW Vĩnh Cửu, Đồng Nai, Việt Nam",
      globalCode: "7P384X6C+JW",
    },
    addressComponents: [
      {
        longName: "Vĩnh Cửu",
        shortName: "Vĩnh Cửu",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "810000",
        shortName: "810000",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c3832e1cedab9167c6477"),
    geometry: {
      location: {
        lat: 11.4251517,
        lng: 107.4343981,
      },
      viewport: {
        northeast: {
          lat: 11.4265671802915,
          lng: 107.4357342302915,
        },
        southwest: {
          lat: 11.42386921970849,
          lng: 107.4330362697085,
        },
      },
    },
    name: "GIBBON SINGING HOME STAY",
    url: "https://maps.google.com/?cid=1221832582449861884",
    website: "http://gibbon-singing-home-stay.business.site/",
    isRecommended: true,
    phoneNumber: "094 634 20 36",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/efgqokuccqepjaahwm3b.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/sade5pwwzk3jlwfjahaa.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/aldglmlcfbexpwwqt4sz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/raqiwyrdbpdjicml9qaq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/blsppfrmovj7plxwfmdj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/zpesx9ajzhgizoah2pwn.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/aagyogt58t2mzmebtalm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/b7ucdb9zgiyvb8tklu2p.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/psjotyrmvvsuw5kp7qr0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680619568/place_photos/hsz1o0hio4dhvdhipdyo.jpg",
    ],
    placeId: "ChIJD1ziGjV6dDER_BTsm0LS9BA",
    plusCode: {
      compoundCode: "CCGM+3Q Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCGM+3Q",
    },
    addressComponents: [
      {
        longName: "863",
        shortName: "863",
        types: ["subpremise"],
      },
      {
        longName: "600a",
        shortName: "600a",
        types: ["street_number"],
      },
      {
        longName: "Tổ 1",
        shortName: "Tổ 1",
        types: ["route"],
      },
      {
        longName: "Ấp 1",
        shortName: "Ấp 1",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "814710",
        shortName: "814710",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c3a6b051d4e45f90563be"),
    geometry: {
      location: {
        lat: 11.0180268,
        lng: 107.2497548,
      },
      viewport: {
        northeast: {
          lat: 11.0192977302915,
          lng: 107.2510902802915,
        },
        southwest: {
          lat: 11.0165997697085,
          lng: 107.2483923197085,
        },
      },
    },
    name: "Sue's Homestay/Farmstay Viet Nam",
    url: "https://maps.google.com/?cid=11812183111238521224",
    website: "http://www.facebook.com/SueHomestaySaigon",
    isRecommended: false,
    phoneNumber: "091 581 90 76",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/w0pgtsstkke73dfi88gg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/zvizkeri0mv52awrntc9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/etfsumlrgrgc7ksszeff.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/wpeqmlwm1f1vbu6oqzgy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/yjaeaqkkh73g8ho8imzj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620136/place_photos/de5bqf4uktdlqb9xwwki.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/azlyw1jlzh3nf5iet56n.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/tg2eyrkw9hx2tdmxcsvx.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/weca3yr6kqbuf6dibh7v.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620137/place_photos/hy05qmxvrowc0fjiyuxe.jpg",
    ],
    placeId: "ChIJI8S6Q9n5dDERiJE9v_RN7aM",
    plusCode: {},
    addressComponents: [
      {
        longName: "269X+6W6",
        shortName: "269X+6W6",
        types: ["plus_code"],
      },
      {
        longName: "Bình Lộc - Cây Da",
        shortName: "Bình Lộc - Cây Da",
        types: ["route"],
      },
      {
        longName: "Thống Nhất",
        shortName: "Thống Nhất",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c3d06051d4e45f90563c2"),
    geometry: {
      location: {
        lat: 11.421115,
        lng: 107.4303899,
      },
      viewport: {
        northeast: {
          lat: 11.4224639802915,
          lng: 107.4317707302915,
        },
        southwest: {
          lat: 11.4197660197085,
          lng: 107.4290727697085,
        },
      },
    },
    name: "River Lodge",
    url: "https://maps.google.com/?cid=18427278464783277787",
    isRecommended: false,
    website: null,
    phoneNumber: "094 852 05 29",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620805/place_photos/fqow0ljqejkr74ed7is2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620805/place_photos/mg7hiog1ppvcfrfyl1mi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620804/place_photos/tuvfugb7wmbpee9ibsyg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620805/place_photos/ebwln87zajdemn5folwy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620804/place_photos/cwmflexgsbzhcz8s1zha.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620804/place_photos/tk9euaufnorfr207dxh7.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620805/place_photos/wpicnhkpnsdlcwxsy74w.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620804/place_photos/vlj4bd4bvaybuzexh0gy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620805/place_photos/l1ld5mdo2ndxnzucqte1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680620805/place_photos/ykf7kve70kqly3l7mx3b.jpg",
    ],
    placeId: "ChIJDR9NTTV6dDER296cviHYuv8",
    plusCode: {
      compoundCode: "CCCJ+C5 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCCJ+C5",
    },
    addressComponents: [
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "Nam Cát Tiên",
        shortName: "Nam Cát Tiên",
        types: ["sublocality_level_1", "sublocality", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c411c0abaa8bb3ea498fd"),
    geometry: {
      location: {
        lat: 11.4265267,
        lng: 107.4344331,
      },
      viewport: {
        northeast: {
          lat: 11.4278506302915,
          lng: 107.4358059802915,
        },
        southwest: {
          lat: 11.4251526697085,
          lng: 107.4331080197085,
        },
      },
    },
    name: "Green Hope Lodge",
    url: "https://maps.google.com/?cid=13344996758164202116",
    website: "http://greenhopelodge.com/",
    isRecommended: false,
    phoneNumber: "097 218 46 83",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/u2nca7rlkzozi4krewlt.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/t4bk0m6v660lzrgodvmb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/kpo0v6umaynf2jjgp2cd.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/pwsb0fbajhosqknwp321.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/wvbs82subrhateluvw3r.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/mrtdgtj9e1ou5dqkkgj4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/xtc5a66rge6ysvpfkj6x.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/jpmveds6ffuhomlikz6q.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/u9jdubwoyyaldm4fejxw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680621850/place_photos/x4hm4tgarqitdoibdw1n.jpg",
    ],
    placeId: "ChIJ_1YY5DR6dDERhOIdw9jzMrk",
    plusCode: {
      compoundCode: "CCGM+JQ Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCGM+JQ",
    },
    addressComponents: [
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c44bd0abaa8bb3ea49901"),
    geometry: {
      location: {
        lat: 11.4213967,
        lng: 107.4304089,
      },
      viewport: {
        northeast: {
          lat: 11.4227350802915,
          lng: 107.4318035802915,
        },
        southwest: {
          lat: 11.4200371197085,
          lng: 107.4291056197085,
        },
      },
    },
    name: "Green Bamboo Lodge Resort",
    url: "https://maps.google.com/?cid=16903473190684749170",
    isRecommended: false,
    website: null,
    phoneNumber: "0824 402 345",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622780/place_photos/zbef7pkvmnhbuwzbtmlg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/qa9eedvfxpatbcznwxon.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/jomreoxqavgewloptyaz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/k8vzkzxhoxpar3cmgvqz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/rrkmtjgbvn27jbnwoek5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/cwue9yvpa57cjzldggy8.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/ybxmplmnrgsvshdlyrhp.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/vb2tjmbbw1fntlqccwlr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/ohowrastjapnrspflxzm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680622779/place_photos/fyrk40wlip1ww6ixlo15.jpg",
    ],
    placeId: "ChIJy91cnsp7dDERcm0a-U4zleo",
    plusCode: {
      compoundCode: "CCCJ+H5 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCCJ+H5",
    },
    addressComponents: [
      {
        longName: "Hamlet 1",
        shortName: "Hamlet 1",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "710000",
        shortName: "710000",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["resort"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c4bdb0abaa8bb3ea49905"),
    geometry: {
      location: {
        lat: 11.4239555,
        lng: 107.4318779,
      },
      viewport: {
        northeast: {
          lat: 11.4253722302915,
          lng: 107.4331866302915,
        },
        southwest: {
          lat: 11.4226742697085,
          lng: 107.4304886697085,
        },
      },
    },
    name: "Nhà Nghỉ Thủy Tiên ECO-LODGE",
    url: "https://maps.google.com/?cid=9454669594404143389",
    isRecommended: false,
    website: null,
    phoneNumber: "098 693 91 64",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/hvrzayump04rubdlw9lj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/u9di9gcyqmomfblqgj1w.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624602/place_photos/dpmxf26g3daxoaiinlqa.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/qx6wizt98w8ka6jvznh5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624602/place_photos/dxme9zixx2vvebr3kb5z.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/r3tmmuwjf8njnxa4wwyb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/jnbeuzxe6azyc8ylysjh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/btsr9obmugchnczmngod.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/xpt49mno1nsqtydpmbkm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680624601/place_photos/c0mk1hiog6lnmrgc0huo.jpg",
    ],
    placeId: "ChIJXXihmkl7dDERHUElM-e7NYM",
    plusCode: {
      compoundCode: "CCFJ+HQ Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCFJ+HQ",
    },
    addressComponents: [
      {
        longName: "Rừng quốc gia",
        shortName: "Rừng quốc gia",
        types: ["route"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "02513",
        shortName: "02513",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["guest_house"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c4fde0abaa8bb3ea49909"),
    geometry: {
      location: {
        lat: 11.4225772,
        lng: 107.4310953,
      },
      viewport: {
        northeast: {
          lat: 11.4239133802915,
          lng: 107.4323741302915,
        },
        southwest: {
          lat: 11.4212154197085,
          lng: 107.4296761697085,
        },
      },
    },
    name: "Forest Side Eco Lodge",
    url: "https://maps.google.com/?cid=1200147891619756916",
    website: "http://forest-side-homestay.business.site/",
    isRecommended: true,
    phoneNumber: "091 830 05 02",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625628/place_photos/xjvbe8eabnqrq9wiqtie.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625628/place_photos/rkomncsw45ckkws1xywe.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625628/place_photos/ricav6lifryi8xoorodv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625628/place_photos/esj7z33x9q4jgmys47fj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625629/place_photos/hejxtrsf1klgrz4wlxsd.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625628/place_photos/d2xucl2yznffewe2dq0y.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625628/place_photos/me6nhrowugwzzzxkfjhw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625629/place_photos/odhk03gavnbksc5t5meg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625629/place_photos/ard1h1cafnebaroklpgx.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680625628/place_photos/k0e9kg1iecu4osylxucx.jpg",
    ],
    placeId: "ChIJK9DrVzV6dDERdPvtFSbIpxA",
    plusCode: {
      compoundCode: "CCFJ+2C Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCFJ+2C",
    },
    addressComponents: [
      {
        longName: "Ấp 1",
        shortName: "Ấp 1",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c531012dac0840c838daf"),
    geometry: {
      location: {
        lat: 11.423855,
        lng: 107.432016,
      },
      viewport: {
        northeast: {
          lat: 11.4253386802915,
          lng: 107.4332849302915,
        },
        southwest: {
          lat: 11.4226407197085,
          lng: 107.4305869697085,
        },
      },
    },
    name: "Cat Tien Farmer Lodge",
    url: "https://maps.google.com/?cid=18431596241475960191",
    website:
      "https://cat-tien-farmer-lodge.business.site/?utm_source=gmb&utm_medium=referral",
    isRecommended: false,
    phoneNumber: "097 494 07 45",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/w7kryxnirm2plfp2q66y.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/sqi23c4ozrsroicvvebn.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/ko26zms0vljbyhogthdw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/nbvg7ijkczfxf7mvj9dy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/ng92hkxu2xdolzh0opwl.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/igt5vkb8wjs6anai427j.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/pgrhlddcb7rauzyzducu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/d4eex2wcjukdf1xuvpod.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/ssz5y3elunqqjo1tndsa.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680626446/place_photos/tuoeszilp3lvborlhi2n.jpg",
    ],
    placeId: "ChIJrWZeS_V7dDERf32ZeCAvyv8",
    plusCode: {
      compoundCode: "CCFJ+GR Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCFJ+GR",
    },
    addressComponents: [
      {
        longName: "879",
        shortName: "879",
        types: ["street_number"],
      },
      {
        longName: "Hamlet 1",
        shortName: "Hamlet 1",
        types: ["route"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "02513",
        shortName: "02513",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c578e16bddcaa200eaebb"),
    geometry: {
      location: {
        lat: 11.421394,
        lng: 107.430569,
      },
      viewport: {
        northeast: {
          lat: 11.4227498302915,
          lng: 107.4318883302915,
        },
        southwest: {
          lat: 11.4200518697085,
          lng: 107.4291903697085,
        },
      },
    },
    name: "Lava Rock Viet Nam Lodge",
    url: "https://maps.google.com/?cid=2445282724433950863",
    website: "http://www.anhflyresort.com/",
    isRecommended: false,
    phoneNumber: "090 315 53 00",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/px003mvg8rkzc4sqk7tu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/e6ikqjxf1wu7icuubyvt.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/ums9mxoyrvdc4f0dyakc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/uoirrutk1opymh7ejvak.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/zoj1lanyzdso63indcyo.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/dookp3xy18nowajk0lnd.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/basv2oj4l8oyexnuabmh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/pjnp5jmjcdcpelt53cwf.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/ty6ioucczpqtcndumelb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680627596/place_photos/lvwljglt9mpycrwo7b7u.jpg",
    ],
    placeId: "ChIJw8W1F7V7dDERj_hIpa5j7yE",
    plusCode: {
      compoundCode: "CCCJ+H6 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCCJ+H6",
    },
    addressComponents: [
      {
        longName: "Vườn Quốc Gia Cát Tiên",
        shortName: "Vườn Quốc Gia Cát Tiên",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c59e421c5b241b4155aac"),
    geometry: {
      location: {
        lat: 11.421423,
        lng: 107.4303172,
      },
      viewport: {
        northeast: {
          lat: 11.4227506302915,
          lng: 107.4317582802915,
        },
        southwest: {
          lat: 11.4200526697085,
          lng: 107.4290603197085,
        },
      },
    },
    name: "River View Restaurant",
    url: "https://maps.google.com/?cid=13969106883606491875",
    isRecommended: false,
    website: null,
    phoneNumber: "0824 402 345",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628194/place_photos/x4h0od1p0oya2eahfhdd.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628194/place_photos/ywkbv50mnvctww2gaaau.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628195/place_photos/iq5zimdivysutgj0wytz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628194/place_photos/bwjgobsa8dpoevkhznki.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628195/place_photos/iwe7qmuflzelke0qyqgh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628195/place_photos/fwxyumvks4j4qwtm9i5u.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628194/place_photos/vohyowklhftwwly2cvwk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628194/place_photos/wdedbvbh98911xpsrhmu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628194/place_photos/bvo4zlrcfapzx5wllnce.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680628194/place_photos/fgx0bhpnsezj5puxf7nb.jpg",
    ],
    placeId: "ChIJFRZeCVp7dDER4zLU-rI83ME",
    plusCode: {
      compoundCode: "CCCJ+H4 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCCJ+H4",
    },
    addressComponents: [
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["restaurant"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c5d1f21c5b241b4155ab0"),
    geometry: {
      location: {
        lat: 11.4244119,
        lng: 107.4321395,
      },
      viewport: {
        northeast: {
          lat: 11.4257140302915,
          lng: 107.4335163302915,
        },
        southwest: {
          lat: 11.4230160697085,
          lng: 107.4308183697085,
        },
      },
    },
    name: "Homestay Đất Việt",
    url: "https://maps.google.com/?cid=16875162349132462178",
    isRecommended: false,
    website: null,
    phoneNumber: "097 628 02 52",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629021/place_photos/eis9o7udybnvvxnfxo2v.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629020/place_photos/nqeherrbcfmrpsgys20x.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629020/place_photos/nblqe0mv2lge9qwwn2kj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629021/place_photos/ctu33sbzrjqy1bvtvmst.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629020/place_photos/da2ktrswkda7vhebk8rk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629021/place_photos/swtwoqlnrq7rnemjwycq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629021/place_photos/jumzabtwewm0zyzfrilg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629020/place_photos/zfvpu56fqwnrlrx3l5ok.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629020/place_photos/y3wzxktknrpdkmeyyasd.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629021/place_photos/shrywlpodu7f7oorzv6e.jpg",
    ],
    placeId: "ChIJuVsp0XJ7dDERYjgWg7-eMOo",
    plusCode: {
      compoundCode: "CCFJ+QV Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCFJ+QV",
    },
    addressComponents: [
      {
        longName: "Ấp 1",
        shortName: "Ấp 1",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "810000",
        shortName: "810000",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642c5df121c5b241b4155ab4"),
    geometry: {
      location: {
        lat: 11.4209466,
        lng: 107.4307832,
      },
      viewport: {
        northeast: {
          lat: 11.4222618302915,
          lng: 107.4319925302915,
        },
        southwest: {
          lat: 11.4195638697085,
          lng: 107.4292945697085,
        },
      },
    },
    name: "Rice straw Green lodge- resort",
    url: "https://maps.google.com/?cid=9919758361411401200",
    website: "https://rice-straw.bedsandhotels.com/",
    isRecommended: false,
    phoneNumber: "0373 748 799",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/wgf75jzkylny64shsmlx.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/wnyrf6ditdrdyo47yteu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/mb17vohwtxjh6dvpqf34.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/wnopiy880bk2npqsc0a3.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/wq1b596qwgf1fjmaaerv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/zb9kzuv5mhdlurbleth9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/pb0zv4x0xuarfzagsju0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629231/place_photos/hmok1ad6esnwb5scjfeo.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629232/place_photos/pesyvowbw98eropcbrfc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680629231/place_photos/adus7mpwjwlure0s71fk.jpg",
    ],
    placeId: "ChIJDxcaIrV7dDER8DWjLawPqok",
    plusCode: {
      compoundCode: "CCCJ+98 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCCJ+98",
    },
    addressComponents: [
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d2bfc21c5b241b4155ab8"),
    geometry: {
      location: {
        lat: 11.4301501,
        lng: 107.4709826,
      },
      viewport: {
        northeast: {
          lat: 11.4314529302915,
          lng: 107.4723598302915,
        },
        southwest: {
          lat: 11.4287549697085,
          lng: 107.4696618697085,
        },
      },
    },
    name: "ORCHARD HOME RESORT",
    url: "https://maps.google.com/?cid=7201089416186228933",
    website: "http://orchardresort.vn/",
    isRecommended: false,
    phoneNumber: "0251 3669 985",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/eydsnusmid634vjklq1h.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/nznotf8qxlgfnjc0zzct.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/ajjsvgihzarwicklyzsb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/aihl2ymutvccz9nbngrh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/dilc6hy7dv1yfoefbdav.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/xy0g5ujolaaswoqkckc1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/l1br9jibd8l3zjgf0psv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/bzkeqk34955wx1wpblse.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681978/place_photos/hoe9kom24ntywzzcnoe4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680681977/place_photos/f2z6bt1i6gpctc2kntut.jpg",
    ],
    placeId: "ChIJkykZgQ96dDERxfCax6to72M",
    plusCode: {
      compoundCode: "CFJC+39 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CFJC+39",
    },
    addressComponents: [
      {
        longName: "Hamlet 5",
        shortName: "Hamlet 5",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["resort"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d2f5758d06859327a5d0f"),
    geometry: {
      location: {
        lat: 11.4250181,
        lng: 107.4357972,
      },
      viewport: {
        northeast: {
          lat: 11.4264227802915,
          lng: 107.4371799302915,
        },
        southwest: {
          lat: 11.4237248197085,
          lng: 107.4344819697085,
        },
      },
    },
    name: "Nam Cát Tiên Homestay",
    url: "https://maps.google.com/?cid=12493758361707621199",
    website: "https://nam-cat-tien-homestay.business.site/",
    isRecommended: true,
    phoneNumber: "097 746 84 92",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682836/place_photos/wdebgbqid9yed65obr65.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682836/place_photos/xw8xblljkfjiqlxlbaaw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682836/place_photos/viyblym18fz1wcdsgzkk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682836/place_photos/ucxyyj5oqvd5lzroiref.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682835/place_photos/jzq9cbmsbsqq6e5nsq5z.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682836/place_photos/f9g5dsg5piuoq2iwahw4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682836/place_photos/eryhgleiqxduukva7sel.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682836/place_photos/vvhpjanivwr0tmps8nho.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682835/place_photos/v1kwhbkvyfdixecbmqvx.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680682835/place_photos/yy1wgdgehwkldpj651md.jpg",
    ],
    placeId: "ChIJ4cOoBjV6dDERTysmAwm_Yq0",
    plusCode: {
      compoundCode: "CCGP+28 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCGP+28",
    },
    addressComponents: [
      {
        longName: "Vườn Quốc Gia Cát Tiên",
        shortName: "Vườn Quốc Gia Cát Tiên",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d313258d06859327a5d13"),
    geometry: {
      location: {
        lat: 11.4229324,
        lng: 107.4302602,
      },
      viewport: {
        northeast: {
          lat: 11.4244822302915,
          lng: 107.4316701302915,
        },
        southwest: {
          lat: 11.4217842697085,
          lng: 107.4289721697085,
        },
      },
    },
    name: "Cát Tiên Riverside",
    url: "https://maps.google.com/?cid=16166947874189223375",
    isRecommended: false,
    website: null,
    phoneNumber: "091 830 05 02",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683312/place_photos/fkd5od4627wwv1hdpedi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683311/place_photos/fnkq22otmfnaehdlxwho.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683311/place_photos/efvwalzrxqyznql5mo0n.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683311/place_photos/jjypwhbfc9te0t2l2q9w.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683310/place_photos/lcz7vnenhn6cveu1sfts.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683311/place_photos/mwrwxji90e9akdkpiadd.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683311/place_photos/zo4rquvq1hinilea8kfo.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683312/place_photos/o2ea8aiax9zxqhhmp83k.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683311/place_photos/rebt3uy51l8o0ho2dt4w.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680683311/place_photos/ysfzabgepcc1fhxmomkw.jpg",
    ],
    placeId: "ChIJaWfKbE97dDERzyVOd2-JXOA",
    plusCode: {
      compoundCode: "CCFJ+54 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCFJ+54",
    },
    addressComponents: [
      {
        longName: "Ấp 1",
        shortName: "Ấp 1",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d370c58d06859327a5d1a"),
    geometry: {
      location: {
        lat: 11.4214362,
        lng: 107.4304593,
      },
      viewport: {
        northeast: {
          lat: 11.4227802302915,
          lng: 107.4318297302915,
        },
        southwest: {
          lat: 11.4200822697085,
          lng: 107.4291317697085,
        },
      },
    },
    name: "Paradise on the Tree",
    url: "https://maps.google.com/?cid=3520793597266041610",
    isRecommended: false,
    website: null,
    phoneNumber: "0824 402 345",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/gc8czxfs5yfqcboy3rv9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/plnvcz1jfycwazakgzuq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/k1bubhswqbstqdla3qtg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/ut9zz5dcpeyjhitl4qnj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/bmcngwadunftq7zljbld.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/sbwp2b4k23yesr8vq0ax.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/kfodgj0veried7mw3wcb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/yawlgjm8bxxbnchmn2zl.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684810/place_photos/a6rh7bbskda1bljfjcbb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680684811/place_photos/mcbwqxa2jldjouvuotbp.jpg",
    ],
    placeId: "ChIJjTq_9_V7dDERChuDbB9f3DA",
    plusCode: {
      compoundCode: "CCCJ+H5 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCCJ+H5",
    },
    addressComponents: [
      {
        longName: "ấp 1",
        shortName: "ấp 1",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d3be858d06859327a5d1f"),
    geometry: {
      location: {
        lat: 11.4205934,
        lng: 107.4608488,
      },
      viewport: {
        northeast: {
          lat: 11.4218621802915,
          lng: 107.4618251302915,
        },
        southwest: {
          lat: 11.4191642197085,
          lng: 107.4591271697085,
        },
      },
    },
    name: "Cat Tien FarmStay",
    url: "https://maps.google.com/?cid=3504328826733760066",
    isRecommended: false,
    website: null,
    phoneNumber: null,
    photos: [],
    placeId: "ChIJ81r_RGt6dDERQo6gTYDgoTA",
    plusCode: {},
    addressComponents: [
      {
        longName: "CFC6+68Q",
        shortName: "CFC6+68Q",
        types: ["plus_code"],
      },
      {
        longName: "Phú Lập - Nam Cát Tiên",
        shortName: "Phú Lập - Nam Cát Tiên",
        types: ["route"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d3ce958d06859327a5d23"),
    geometry: {
      location: {
        lat: 11.4192159,
        lng: 107.4429481,
      },
      viewport: {
        northeast: {
          lat: 11.4204696802915,
          lng: 107.4442108802915,
        },
        southwest: {
          lat: 11.4177717197085,
          lng: 107.4415129197085,
        },
      },
    },
    name: "Cat Tien Farmstay",
    url: "https://maps.google.com/?cid=11903071781018059245",
    website: "http://www.cattienjunglelodge.com/",
    isRecommended: false,
    phoneNumber: "0251 3664 888",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686309/place_photos/dejdnkqqzevtef9gyg33.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686309/place_photos/njwugkpfv3pweg8kqpu2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686310/place_photos/fetzc2e7anmg00d6yry1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686309/place_photos/fvfonpdylaymqqmn268r.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686309/place_photos/xhwcshjvucwfidhs59ac.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686310/place_photos/knmrsaaoxecr9yid9cpw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686310/place_photos/hjmrrb0nmpjhsw5gmsuk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686310/place_photos/zsvrwpvg0hafetcfqce8.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686309/place_photos/wnfwqnm1h47x829vonu5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686309/place_photos/hlxowrswmvrb008z4v7x.jpg",
    ],
    placeId: "ChIJU4KCjEh6dDER7cGOO7g0MKU",
    plusCode: {
      compoundCode: "CC9V+M5 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CC9V+M5",
    },
    addressComponents: [
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["homestay"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d3eeb1b6beaabd77806a0"),
    geometry: {
      location: {
        lat: 10.9556834,
        lng: 106.8606629,
      },
      viewport: {
        northeast: {
          lat: 10.9569986302915,
          lng: 106.8620029302915,
        },
        southwest: {
          lat: 10.9543006697085,
          lng: 106.8593049697085,
        },
      },
    },
    name: "Hostel NGOC LAN",
    url: "https://maps.google.com/?cid=18319193735934585035",
    isRecommended: true,
    website: null,
    phoneNumber: "093 273 38 25",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686825/place_photos/glrceguyavuksu30clcv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686824/place_photos/itmv3pbontdpoknuhps6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686824/place_photos/pyi2vxto89pidzhqj9mv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686825/place_photos/vf3bkgdycv6mssaonnay.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686824/place_photos/yapg5ctjhcezgv7ievpu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686825/place_photos/x54hd6pqrba41tw349d5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686824/place_photos/dcvxmp3xbov3xdjlee9n.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686825/place_photos/e5isr928jfmd0epqss4b.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680686825/place_photos/aqmyiplwf0u3mpnen368.jpg",
    ],
    placeId: "ChIJKwFJ7IDedDERyyjxwaTZOv4",
    plusCode: {
      compoundCode: "XV46+77 Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XV46+77",
    },
    addressComponents: [
      {
        longName: "30",
        shortName: "30",
        types: ["subpremise"],
      },
      {
        longName: "46",
        shortName: "46",
        types: ["street_number"],
      },
      {
        longName: "Đường Đặng Đức Thuật",
        shortName: "Đ. Đặng Đức Thuật",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["hotel"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d54fa1b6beaabd77806a4"),
    geometry: {
      location: {
        lat: 10.6586852,
        lng: 106.856163,
      },
      viewport: {
        northeast: {
          lat: 10.6600525302915,
          lng: 106.8575492302915,
        },
        southwest: {
          lat: 10.6573545697085,
          lng: 106.8548512697085,
        },
      },
    },
    name: "Khu du lịch Sinh Thái Bò Cạp Vàng",
    url: "https://maps.google.com/?cid=2028214923134420180",
    website: "https://bocapvang.net/",
    isRecommended: true,
    phoneNumber: "0868 848 189",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/twytib5fp42ubsscfwmy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/qaqtsc320jsiui6ve1nu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/x017cyash7ah0rqwhoac.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/yjoxwmap6e8xlbddiodj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/fmbijlu2j87ux4jyrsiu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/sms6nx5iy2xxsfh1yty1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/xoq8sj30ee0i98pwaqjw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692469/place_photos/soo5t13znz0ldoxbczen.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692470/place_photos/vabuj2et7gxemxi0dyie.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680692469/place_photos/cnjt3qnji0eaogjtqg4q.jpg",
    ],
    placeId: "ChIJddqZy-Q8dTER1MSSBbqqJRw",
    plusCode: {
      compoundCode: "MV54+FF Nhơn Trạch, Đồng Nai, Việt Nam",
      globalCode: "7P28MV54+FF",
    },
    addressComponents: [
      {
        longName: "số 203",
        shortName: "số 203",
        types: ["street_number"],
      },
      {
        longName: "Ấp 3",
        shortName: "Ấp 3",
        types: ["route"],
      },
      {
        longName: "Nhơn Trạch",
        shortName: "Nhơn Trạch",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "76263",
        shortName: "76263",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["ecotourism", "campground"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d5a5f1b6beaabd77806ac"),
    geometry: {
      location: {
        lat: 11.0983751,
        lng: 107.0499995,
      },
      viewport: {
        northeast: {
          lat: 11.0997239302915,
          lng: 107.0513489302915,
        },
        southwest: {
          lat: 11.0970259697085,
          lng: 107.0486509697085,
        },
      },
    },
    name: "Khu du lịch Đảo Ó",
    url: "https://maps.google.com/?cid=15798916849674577640",
    website: "http://ctitravel.vn/",
    isRecommended: false,
    phoneNumber: "098 860 60 06",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/usza3lbpbl4ry6bde6qq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/atqll2szebr09rvtp971.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/aypoi3gce9qplm5r4wer.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/g0eujrsepui88bl69fpn.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693852/place_photos/iheabfsverno1xrvgcnn.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/rykbhxdizwkbm50hdnas.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/xqhwfwv34ax0cczjpxpz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/nzxlc1cfq7llabvgz5uj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/bhthtmsnvbnsugkikysm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680693851/place_photos/vuhkfmtmmx6h9ikzux1b.jpg",
    ],
    placeId: "ChIJ_cQAm_3xdDER6GbJJCsHQds",
    plusCode: {
      compoundCode: "32XX+9X Vĩnh Cửu, Đồng Nai, Việt Nam",
      globalCode: "7P3932XX+9X",
    },
    addressComponents: [
      {
        longName: "Bến đò Đảo Ó",
        shortName: "Bến đò Đảo Ó",
        types: ["point_of_interest"],
      },
      {
        longName: "Vĩnh An",
        shortName: "Vĩnh An",
        types: ["sublocality_level_1", "sublocality", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "70000",
        shortName: "70000",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["tourist_area"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d5e2a1b6beaabd77806b0"),
    geometry: {
      location: {
        lat: 10.740421,
        lng: 106.7903552,
      },
      viewport: {
        northeast: {
          lat: 10.7417699802915,
          lng: 106.7917041802915,
        },
        southwest: {
          lat: 10.7390720197085,
          lng: 106.7890062197085,
        },
      },
    },
    name: "Làng Du Lịch Sinh Thái Tre Việt",
    url: "https://maps.google.com/?cid=6028451806917096171",
    website: "http://langdulichtreviet.com/",
    isRecommended: false,
    phoneNumber: "0862 777 827",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694821/place_photos/ezszkp7j58xwescpvfgc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694821/place_photos/adtdtvvfslb47wgfo3gw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694822/place_photos/l1p3guomdtac3syd1csu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694821/place_photos/bvohfor5rv3jc4twmtdm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694821/place_photos/ks0gladcw9vh2zhevau5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694821/place_photos/mnuwrgqbixfkokycnbrc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694822/place_photos/mljucqdke6k9nzzg58it.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694822/place_photos/xijfmfzgdo0hq0umccry.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694822/place_photos/ueanh7dcsp1ddb7cbkfz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680694822/place_photos/qyxfonlfxumxupcrpkaw.jpg",
    ],
    placeId: "ChIJpZhqM2ckdTER6_LacPpcqVM",
    plusCode: {
      compoundCode: "PQRR+54 Nhơn Trạch, Đồng Nai, Việt Nam",
      globalCode: "7P28PQRR+54",
    },
    addressComponents: [
      {
        longName: "25",
        shortName: "25",
        types: ["street_number"],
      },
      {
        longName: "Phan Văn Đáng",
        shortName: "Phan Văn Đáng",
        types: ["route"],
      },
      {
        longName: "Ấp Phước Lương",
        shortName: "Ấp Phước Lương",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Phú Hữu",
        shortName: "Phú Hữu",
        types: ["sublocality_level_1", "sublocality", "political"],
      },
      {
        longName: "Nhơn Trạch",
        shortName: "Nhơn Trạch",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["ecotourism", "campground"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d8c771b6beaabd77806b4"),
    geometry: {
      location: {
        lat: 10.989564,
        lng: 107.014722,
      },
      viewport: {
        northeast: {
          lat: 10.9909014302915,
          lng: 107.0160809302915,
        },
        southwest: {
          lat: 10.9882034697085,
          lng: 107.0133829697085,
        },
      },
    },
    name: "Thác Đá Hàn",
    url: "https://maps.google.com/?cid=10169167029756090076",
    website: "http://thacdahan.vn/",
    isRecommended: true,
    phoneNumber: "090 295 00 55",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706675/place_photos/uqxnqj5p8bxrqwqfwqie.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706666/place_photos/iju8lfnnm2cawuuoqau3.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706667/place_photos/vtuftdwtnx623xq3pzus.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706666/place_photos/jozv6aldbpdgfbdnlmbk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706667/place_photos/yuoizjqriu7tui83bt8y.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706667/place_photos/fhgduefoopdjrnsqjwsy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706666/place_photos/yztjmfrqdre7zqlvljgo.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706667/place_photos/sgt8tltc39tqheb1olii.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706666/place_photos/hu4e7hurlhpeldbgncxg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680706667/place_photos/ik4o4yhbwd1svhmhejqx.jpg",
    ],
    placeId: "ChIJ0zDkc3fmdDER3NY59ogjII0",
    plusCode: {
      compoundCode: "X2Q7+RV Trảng Bom, Đồng Nai, Việt Nam",
      globalCode: "7P29X2Q7+RV",
    },
    addressComponents: [
      {
        longName: "Trảng Bom",
        shortName: "Trảng Bom",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots", "campground"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d90551b6beaabd77806b8"),
    geometry: {
      location: {
        lat: 10.9147502,
        lng: 106.9363732,
      },
      viewport: {
        northeast: {
          lat: 10.9160848802915,
          lng: 106.9377304302915,
        },
        southwest: {
          lat: 10.9133869197085,
          lng: 106.9350324697085,
        },
      },
    },
    name: "Khu du lịch sinh thái Vườn Xoài",
    url: "https://maps.google.com/?cid=8867000078479327278",
    website: "http://www.vuonxoai.vn/",
    isRecommended: true,
    phoneNumber: "094 396 81 63",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707667/place_photos/qxkiznjqr2rp1vdzefkp.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/p2pm7z4zinov9p5atwns.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/avsb0emck5gge9hezkor.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/l7uwtbzhtyvuajhnr154.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/fozhjas4clnipaiiqylg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707667/place_photos/ghmkocthewidpbpqytor.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/le3gzdvtq3jzoaadf9gy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/qvoeo95tnme52ewae3hf.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/p1wmprrng9lqhaa7s1sv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680707666/place_photos/lltnkz4erq57foc3mvzq.jpg",
    ],
    placeId: "ChIJafwHaNnfdDERLgAfjZfpDXs",
    plusCode: {
      compoundCode: "WW7P+WG Long Thành, Đồng Nai, Việt Nam",
      globalCode: "7P28WW7P+WG",
    },
    addressComponents: [
      {
        longName: "537",
        shortName: "537",
        types: ["street_number"],
      },
      {
        longName: "Đinh Quang Ân",
        shortName: "Đinh Quang Ân",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["ecotourism", "campground", "lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d95b41b6beaabd77806bc"),
    geometry: {
      location: {
        lat: 11.2531849,
        lng: 107.3168027,
      },
      viewport: {
        northeast: {
          lat: 11.2546510802915,
          lng: 107.3181688802915,
        },
        southwest: {
          lat: 11.2519531197085,
          lng: 107.3154709197085,
        },
      },
    },
    name: "Khu Du lịch sinh Thái Thác Ba Giọt",
    url: "https://maps.google.com/?cid=2911705051780011676",
    isRecommended: false,
    website: null,
    phoneNumber: "090 969 97 92",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709040/place_photos/oi3kbqbm2yxpxep2gihh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709041/place_photos/tdoo7bannjpkyssbsbua.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709041/place_photos/iojkmi6vt6pvoukfs4va.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709041/place_photos/m6kjpdk8ra02pr6kfmv5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709041/place_photos/hhdeeqmaxb7d6wod3ryd.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709041/place_photos/qgoaap2pffpok70vquuk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709041/place_photos/l1qqdbxyzmetnmh23hue.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709042/place_photos/oooryphxlsa2ctw2lhqg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709041/place_photos/fl2mo0eq9yloh5gkxkir.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680709040/place_photos/mi7atrdhrfl1th9jelee.jpg",
    ],
    placeId: "ChIJfS8irb9hdDERnNYOVlF0aCg",
    plusCode: {
      compoundCode: "7838+7P Định Quán, Đồng Nai, Việt Nam",
      globalCode: "7P397838+7P",
    },
    addressComponents: [
      {
        longName: "thác Ba Giọt",
        shortName: "thác Ba Giọt",
        types: ["route"],
      },
      {
        longName: "Định Quán",
        shortName: "Định Quán",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots", "ecotourism", "campground"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d9c141b6beaabd77806c3"),
    geometry: {
      location: {
        lat: 11.1107256,
        lng: 107.4528863,
      },
      viewport: {
        northeast: {
          lat: 11.1123053802915,
          lng: 107.4542394302915,
        },
        southwest: {
          lat: 11.1096074197085,
          lng: 107.4515414697085,
        },
      },
    },
    name: "Khu Du lịch Thác Mai",
    url: "https://maps.google.com/?cid=618761740222959708",
    website: "https://www.facebook.com/khamphathacmai/",
    isRecommended: false,
    phoneNumber: null,
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/cylcwlp1ygg9lszsspc6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/gdvrtaswzj68zjbnfu9q.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/pz2mb3d5kmq5zsc1cwv1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/jkzdthfeipfxns5nzwj6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/gdpzuuddacws4tve9y0n.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/rtlidoqzoppypkhbojf0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/peqnwl6bysux3j1uxwtz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/bxex6jhyutiyu25lo9md.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/peajyicdbkar0uwtl7cw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680710673/place_photos/imd9a2nnnkjsals7kdmq.jpg",
    ],
    placeId: "ChIJv0J81sxbdDERXJCXPoZIlgg",
    plusCode: {
      compoundCode: "4F63+75 Định Quán, Đồng Nai, Việt Nam",
      globalCode: "7P394F63+75",
    },
    addressComponents: [
      {
        longName: "Gia Canh",
        shortName: "Gia Canh",
        types: ["administrative_area_level_3", "political"],
      },
      {
        longName: "Định Quán",
        shortName: "Định Quán",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots", "tourist_area", "campground"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642d9ec71b6beaabd77806c7"),
    geometry: {
      location: {
        lat: 11.1042335,
        lng: 107.4079331,
      },
      viewport: {
        northeast: {
          lat: 11.1052024802915,
          lng: 107.4093459302915,
        },
        southwest: {
          lat: 11.1025045197085,
          lng: 107.4066479697085,
        },
      },
    },
    name: "Bàu nước sôi (KDL Thác Mai)",
    url: "https://maps.google.com/?cid=11673001363063919187",
    isRecommended: false,
    website: null,
    phoneNumber: "0251 3853 022",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/dwdh9idaddnjgs4tajkh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/qs1m2u5rxoaav7nxwma8.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/cmv5h8xox1zoqty4jeuf.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/vrmgiiy0id6tmmxmjez2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/j6pywgsbfs0b0zks2row.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/ufwa62cfyg0akw8g5w3w.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/u1iw81tsbwk6avgqn1kc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/zjmdqegz0i7gyvnhrrxn.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/ybqwwxx6ghxfs1exydku.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680711363/place_photos/uve02v1bp3dmz6nqccnq.jpg",
    ],
    placeId: "ChIJGao2zwxcdDERU1ITvOTU_qE",
    plusCode: {},
    addressComponents: [
      {
        longName: "4C35+M5V",
        shortName: "4C35+M5V",
        types: ["plus_code"],
      },
      {
        longName: "Định Quán",
        shortName: "Định Quán",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["ecotourism"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642da6581b6beaabd77806cb"),
    geometry: {
      location: {
        lat: 11.2202888,
        lng: 107.172085,
      },
      viewport: {
        northeast: {
          lat: 11.28874541900095,
          lng: 107.2902311276524,
        },
        southwest: {
          lat: 11.073855131239,
          lng: 106.9848192787053,
        },
      },
    },
    name: "Hồ Trị An",
    url: "https://maps.google.com/?q=H%E1%BB%93+Tr%E1%BB%8B+An&ftid=0x3174f2dd1d948841:0x4f846dec3ff32d4d",
    isRecommended: false,
    website: null,
    phoneNumber: null,
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/bk81bb7j8e89klrslfne.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/pvksqzyisg0hkwp5rqf6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/mg7cqlpfr4xihagzapiw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/vmwxxonhtpzqxubbdeut.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713300/place_photos/vptvlewfeuabszd0kt30.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/kw26piymnq6htqf2pvmt.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/atgjui5mbup7yxgkny1p.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/lugrptoczuj8i3io21wm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/arj2p9vs2ktov4ooezy6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680713301/place_photos/jkf7f7ikp6sq2mwlo3ta.jpg",
    ],
    placeId: "ChIJQYiUHd3ydDERTS3zP-xthE8",
    plusCode: {},
    addressComponents: [
      {
        longName: "Hồ Trị An",
        shortName: "Hồ Trị An",
        types: ["natural_feature"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots", "campground"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("642daade1b6beaabd77806cf"),
    geometry: {
      location: {
        lat: 11.4234043,
        lng: 107.4309571,
      },
      viewport: {
        northeast: {
          lat: 11.4247471802915,
          lng: 107.4323109302915,
        },
        southwest: {
          lat: 11.4220492197085,
          lng: 107.4296129697085,
        },
      },
    },
    name: "Vườn Quốc Gia Cát Tiên",
    url: "https://maps.google.com/?cid=6362133050519837093",
    isRecommended: false,
    website: null,
    phoneNumber: "093 952 03 40",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714458/place_photos/gk5tuvs2skyjxkrgnymg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/offgnmtkfqywyrl42zws.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/utioqnjvq9xfxsetgxwz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/cc2yzsetavtalnb4g16x.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/tlttupz50kmnn1y5bp3q.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714458/place_photos/awe6od1rcrlfy77dzod0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/s47p4ho63bvso9vtg8uz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/ykzbcacp55egz6wmjjy1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/zbyatfihsc4lzggxnpjp.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1680714459/place_photos/a2s9cmqsctngdxrmal6i.jpg",
    ],
    placeId: "ChIJkWPpm5aAdDERpdkBKk3WSlg",
    plusCode: {
      compoundCode: "CCFJ+99 Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P39CCFJ+99",
    },
    addressComponents: [
      {
        longName: "Nam Cát Tiên",
        shortName: "Nam Cát Tiên",
        types: ["administrative_area_level_3", "political"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots", "ecotourism"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6435769eef61972f06599145"),
    geometry: {
      location: {
        lat: 11.2027893,
        lng: 107.0220397,
      },
      viewport: {
        northeast: {
          lat: 11.2041382802915,
          lng: 107.0233886802915,
        },
        southwest: {
          lat: 11.2014403197085,
          lng: 107.0206907197085,
        },
      },
    },
    name: "Khu Bảo tồn Thiên nhiên - Văn hóa Đồng Nai",
    url: "https://maps.google.com/?cid=440888172082698063",
    website: "http://dongnaireserve.org.vn/",
    isRecommended: false,
    phoneNumber: "0251 3861 290",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225366/place_photos/npxuhtcvh6ewbjfbydp4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225367/place_photos/puxteseh7icsrazsvlcf.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225365/place_photos/t8uynl9syxikni4gsykq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225367/place_photos/aifmt6hwjjmkvicf7jdi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225367/place_photos/ylmnilnsgvtbo7hfwtbs.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225366/place_photos/kbin46rrzzgdo0x8lvyn.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225367/place_photos/tcq4e7xhlr4ce1anmooc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225366/place_photos/tm1a2ldaxc94ncmyvane.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225365/place_photos/dfloehp1ocpee4mqdv5c.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1681225367/place_photos/rzhj2p2fvbw3bcuip40b.jpg",
    ],
    placeId: "ChIJgyaubYfudDERTxep4nRZHgY",
    plusCode: {
      compoundCode: "623C+4R Vĩnh Cửu, Đồng Nai, Việt Nam",
      globalCode: "7P39623C+4R",
    },
    addressComponents: [
      {
        longName: "Mã Đà",
        shortName: "Mã Đà",
        types: ["administrative_area_level_3", "political"],
      },
      {
        longName: "Vĩnh Cửu",
        shortName: "Vĩnh Cửu",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["park"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("643c2f31a1a05745b384db65"),
    geometry: {
      location: {
        lat: 10.9611495,
        lng: 106.7899037,
      },
      viewport: {
        northeast: {
          lat: 10.97018955,
          lng: 106.8026489,
        },
        southwest: {
          lat: 10.95520575,
          lng: 106.7852041,
        },
      },
    },
    name: "Khu du lịch Bửu Long",
    url: "https://maps.google.com/?cid=12263572617039158825",
    website: "https://buulong.com.vn/",
    isRecommended: true,
    phoneNumber: "0251 8850 023",
    photos: [],
    placeId: "ChIJuRwVIN_bdDERKZ7T61H2MKo",
    plusCode: {
      compoundCode: "XQ6Q+FX Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XQ6Q+FX",
    },
    addressComponents: [
      {
        longName: "Huỳnh Văn Nghệ",
        shortName: "Huỳnh Văn Nghệ",
        types: ["route"],
      },
      {
        longName: "Khu phố 4",
        shortName: "Khu phố 4",
        types: ["neighborhood", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["tourist_area"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6481ad4dbb0bf14fb1da3a7e"),
    geometry: {
      location: {
        lat: 11.1908265,
        lng: 107.3483458,
      },
      viewport: {
        northeast: {
          lat: 11.1921162802915,
          lng: 107.3497931302915,
        },
        southwest: {
          lat: 11.1894183197085,
          lng: 107.3470951697085,
        },
      },
    },
    name: "Đá Ba Chồng",
    url: "https://maps.google.com/?cid=1643256739801546348",
    isRecommended: false,
    website: null,
    phoneNumber: null,
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220103/place_photos/u83sa57zkar1yuompueg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220103/place_photos/parcndcajr66cxutvoam.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220106/place_photos/a9c6pn3fwlunbgmyt9l9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220106/place_photos/cr6wvmhnyiljojpf9qhh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220106/place_photos/cooi30d8vpwxxov6phhf.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220103/place_photos/eqol2kybz6ovuqpubkmw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220106/place_photos/gktxj3yzz3jzx6iulxms.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220105/place_photos/clhs4wzgurbea30opl5o.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220106/place_photos/myfrr5x99sq0gyxhjvqk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220106/place_photos/yoyqkvuernqlemhba9i1.jpg",
    ],
    placeId: "ChIJlVA6BoNgdDERbD6jakwFzhY",
    plusCode: {
      compoundCode: "58RX+88 Định Quán, Đồng Nai, Việt Nam",
      globalCode: "7P3958RX+88",
    },
    addressComponents: [
      {
        longName: "231",
        shortName: "231",
        types: ["street_number"],
      },
      {
        longName: "Quốc lộ 20",
        shortName: "QL20",
        types: ["route"],
      },
      {
        longName: "Định Quán",
        shortName: "Định Quán",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6481af8d735b7764cc53856c"),
    geometry: {
      location: {
        lat: 10.9645454,
        lng: 106.8014723,
      },
      viewport: {
        northeast: {
          lat: 10.9657977302915,
          lng: 106.8029392802915,
        },
        southwest: {
          lat: 10.9630997697085,
          lng: 106.8002413197085,
        },
      },
    },
    name: "Văn miếu Trấn Biên",
    url: "https://maps.google.com/?cid=3618200410077933490",
    website: "http://vanmieutranbien.com.vn/",
    isRecommended: false,
    phoneNumber: "0251 3951 991",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220680/place_photos/fjsr5csp24vzn1qxwges.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220680/place_photos/httrhe4ph0tyn3epnfvr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220680/place_photos/or3omolbreemomr9bg6e.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220681/place_photos/fnrayfffgm9usp3fx2zg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220681/place_photos/v9rcpw0rwxbvjvuwkb8u.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220681/place_photos/tghabmv7otvccmffuzeg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220681/place_photos/hdh1ns0nuz9n1lcekntr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220681/place_photos/wd1ku7bcil7sj9wfmhbb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220681/place_photos/cmyskff7kqmmkiwzdeuj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220681/place_photos/ylr4lhw8ztn0dxriqmld.jpg",
    ],
    placeId: "ChIJB0UXa-TbdDERsi_eWBpuNjI",
    plusCode: {},
    addressComponents: [
      {
        longName: "XR72+RH9",
        shortName: "XR72+RH9",
        types: ["plus_code"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["place_of_worship"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6481afc9735b7764cc53856f"),
    geometry: {
      location: {
        lat: 10.9373345,
        lng: 107.3766239,
      },
      viewport: {
        northeast: {
          lat: 10.9404017,
          lng: 107.3780936802915,
        },
        southwest: {
          lat: 10.9373345,
          lng: 107.3753957197085,
        },
      },
    },
    name: "Núi Chứa Chan",
    url: "https://maps.google.com/?cid=765949038709524648",
    isRecommended: false,
    website: null,
    phoneNumber: null,
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220739/place_photos/p4u3nxwfnddyqpwg0jsw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220741/place_photos/dq0kfqfrh9qsctidrhgg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220738/place_photos/x3u5lb0benvhzmxinztj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220740/place_photos/gfajmndisgn8qtuxaxsm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220741/place_photos/s5nzssorty16q52blcv2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220741/place_photos/tyfcxdnx3hxb1fsxp8ho.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220741/place_photos/q6l7jrgfusbyznnboacw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220741/place_photos/sr8lieczvq7heanij5sw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220738/place_photos/r4prfqbdjlc0asmzjmoe.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220740/place_photos/mjplgcocwv0pwnyejzys.jpg",
    ],
    placeId: "ChIJdye8kLZWdDERqEhVsJcyoQo",
    plusCode: {
      compoundCode: "W9PG+WJ Xuân Lộc, Đồng Nai, Việt Nam",
      globalCode: "7P29W9PG+WJ",
    },
    addressComponents: [
      {
        longName: "Núi Chứa Chan",
        shortName: "Núi Chứa Chan",
        types: ["natural_feature"],
      },
      {
        longName: "Xuân Lộc",
        shortName: "Xuân Lộc",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6481b02b735b7764cc538572"),
    geometry: {
      location: {
        lat: 10.9185234,
        lng: 106.9892328,
      },
      viewport: {
        northeast: {
          lat: 10.9200797802915,
          lng: 106.9907099302915,
        },
        southwest: {
          lat: 10.9173818197085,
          lng: 106.9880119697085,
        },
      },
    },
    name: "Thác Giang Điền",
    url: "https://maps.google.com/?cid=11116699333427581397",
    website: "http://giangdien.vn/",
    isRecommended: false,
    phoneNumber: "0251 3923 930",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220833/place_photos/cjrypawn2ogdfjhggrdg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220832/place_photos/rnhqvpce3wiziw3d0rel.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220834/place_photos/thb9wttqx9vmzsikdt3e.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220836/place_photos/zm2qf5ekbx7hccqtt1m3.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220839/place_photos/fb03osxkcks2e0u9ejbb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220835/place_photos/yae1ftafqkdpjfejukrw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220839/place_photos/pd1yau4j0p6imqsf4tau.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220835/place_photos/ml5xrtbl7eq6oynxcwwa.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220836/place_photos/tar1wielmv9h67jjg3cj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220835/place_photos/vcfr2bjy5veh3qsaycfj.jpg",
    ],
    placeId: "ChIJp0N7H2zhdDER1dHFGyVzRpo",
    plusCode: {
      compoundCode: "WX9Q+CM Trảng Bom, Đồng Nai, Việt Nam",
      globalCode: "7P28WX9Q+CM",
    },
    addressComponents: [
      {
        longName: "104/4",
        shortName: "104/4",
        types: ["street_number"],
      },
      {
        longName: "ấp Hoà Bình",
        shortName: "ấp Hoà Bình",
        types: ["route"],
      },
      {
        longName: "Trảng Bom",
        shortName: "Trảng Bom",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["scenic_spots", "ecotourism"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6481b072735b7764cc538575"),
    geometry: {
      location: {
        lat: 10.9964084,
        lng: 106.786293,
      },
      viewport: {
        northeast: {
          lat: 10.9977349802915,
          lng: 106.7876585302915,
        },
        southwest: {
          lat: 10.9950370197085,
          lng: 106.7849605697085,
        },
      },
    },
    name: "Làng bưởi Năm Huệ Tân Triều",
    url: "https://maps.google.com/?cid=503223231347149135",
    isRecommended: false,
    website: null,
    phoneNumber: "0251 3965 555",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220909/place_photos/ddvlkleyk8mjrnv6r0ta.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220909/place_photos/ipqgbpj7qwuw2fuzxnr6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220909/place_photos/cojzlyt379or0z55feni.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220910/place_photos/hdftj6bbbota6pdcyrth.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220911/place_photos/xlzmwibm3bdtu6hayvtm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220910/place_photos/hnzyt3r92pocwvambqts.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220910/place_photos/rhawop3dueiibjtpmleo.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220909/place_photos/mpgq60elfderovzi9qnv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220910/place_photos/w89iue54nfncftu6ticr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686220911/place_photos/rdzzac4h5uijnzhfrqho.jpg",
    ],
    placeId: "ChIJW_tiL6TbdDERT8kr29zO-wY",
    plusCode: {
      compoundCode: "XQWP+HG Vĩnh Cửu, Đồng Nai, Việt Nam",
      globalCode: "7P28XQWP+HG",
    },
    addressComponents: [
      {
        longName: "109/7",
        shortName: "109/7",
        types: ["premise"],
      },
      {
        longName: "Hương Lộ 9",
        shortName: "Hương Lộ 9",
        types: ["route"],
      },
      {
        longName: "Vĩnh Cửu",
        shortName: "Vĩnh Cửu",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["restaurant"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6481ea068410772dc1a9595a"),
    geometry: {
      location: {
        lat: 10.9881394,
        lng: 106.8703543,
      },
      viewport: {
        northeast: {
          lat: 10.9894958302915,
          lng: 106.8716984302915,
        },
        southwest: {
          lat: 10.9867978697085,
          lng: 106.8690004697085,
        },
      },
    },
    name: "Quán Nhớ coffee",
    url: "https://maps.google.com/?cid=15461748533840045946",
    isRecommended: false,
    website: null,
    phoneNumber: "098 847 54 99",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235647/place_photos/wynkx1nxsyhi4r3hakq8.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235650/place_photos/qj6av0dfhzcjdltsadtm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235649/place_photos/rlxftu2yqi1ik1z4w2vi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235648/place_photos/v35mhasrkxxwdnf9qpcu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235650/place_photos/xxapneqp6wrrmmopd4eh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235648/place_photos/vcxf9mvaojjbpggrtwdw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235649/place_photos/gk3bpytlcijrdj6pplgx.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235650/place_photos/axpzifpfkfp8rcaet1sw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235647/place_photos/soqfg9elta3szndygslt.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686235647/place_photos/ubvbtowxas8bhr7scinf.jpg",
    ],
    placeId: "ChIJ8Q0x6ovddDEReufzJV8qk9Y",
    plusCode: {
      compoundCode: "XVQC+74 Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XVQC+74",
    },
    addressComponents: [
      {
        longName: "Khu phố 5A",
        shortName: "Khu phố 5A",
        types: ["neighborhood", "political"],
      },
      {
        longName: "Trảng Dài",
        shortName: "Trảng Dài",
        types: ["sublocality_level_1", "sublocality", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6481ec4b8410772dc1a9595e"),
    geometry: {
      location: {
        lat: 10.9570559,
        lng: 106.8438611,
      },
      viewport: {
        northeast: {
          lat: 10.9584473302915,
          lng: 106.8452190302915,
        },
        southwest: {
          lat: 10.9557493697085,
          lng: 106.8425210697085,
        },
      },
    },
    name: "Hien coffee & tea",
    url: "https://maps.google.com/?cid=17965986552364474478",
    website: "https://www.facebook.com/hiencoffeebienhoa/",
    isRecommended: false,
    phoneNumber: "090 815 88 33",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236224/place_photos/llsv7ra5csjgbv53xwbh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236225/place_photos/wjnv5gpmknn9ebj4s4z6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236228/place_photos/xwx837gjaybplbsrwk8d.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236226/place_photos/dbdas2tbvpjwv4qtdyt8.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236226/place_photos/xpx2yryisgmkvpqbvtnb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236227/place_photos/pcwdx4ans3jxr69sxkyj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236226/place_photos/simt9lvkihaghrcalsyr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236226/place_photos/rijmhwucjk048ya3ooq4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236226/place_photos/n1stsvoqeywks6iu8odo.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686236226/place_photos/wzj7ds9y91sqfqbvh3zk.jpg",
    ],
    placeId: "ChIJYaKh3I_ddDERbiAh3ZQBVPk",
    plusCode: {
      compoundCode: "XR4V+RG Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XR4V+RG",
    },
    addressComponents: [
      {
        longName: "1275",
        shortName: "1275",
        types: ["subpremise"],
      },
      {
        longName: "đường",
        shortName: "đường",
        types: ["street_number"],
      },
      {
        longName: "Đường Phạm Văn Thuận",
        shortName: "Đ. Phạm Văn Thuận",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "76108",
        shortName: "76108",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("648268314997ef945afa43ab"),
    geometry: {
      location: {
        lat: 10.951501,
        lng: 106.822311,
      },
      viewport: {
        northeast: {
          lat: 10.9528024302915,
          lng: 106.8237240802915,
        },
        southwest: {
          lat: 10.9501044697085,
          lng: 106.8210261197085,
        },
      },
    },
    name: "Công viên Biên Hùng",
    url: "https://maps.google.com/?cid=4714728807451054644",
    isRecommended: false,
    website: null,
    phoneNumber: "0795 899 888",
    photos: [],
    placeId: "ChIJvRCAdazedDERNNJr5N4UbkE",
    plusCode: {
      compoundCode: "XR2C+JW Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XR2C+JW",
    },
    addressComponents: [
      {
        longName: "Đuờng 30 Tháng 4",
        shortName: "Đ. 30 Tháng 4",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["park"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("648284c80d674425eee7fbb4"),
    geometry: {
      location: {
        lat: 10.9941722,
        lng: 106.8019278,
      },
      viewport: {
        northeast: {
          lat: 10.9955316302915,
          lng: 106.8032463302915,
        },
        southwest: {
          lat: 10.9928336697085,
          lng: 106.8005483697085,
        },
      },
    },
    name: "Café Thanh Thủy",
    url: "https://maps.google.com/?cid=16839318287799244152",
    isRecommended: false,
    website: null,
    phoneNumber: null,
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275267/place_photos/d3fplc1wifolgxynfqg1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275265/place_photos/vswar7mjkkxqgxxs2fr5.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275264/place_photos/xntlwpsndwspwbms4fab.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275266/place_photos/axgma0evonirljsh7so7.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275264/place_photos/hjixd8kkfqaaqkphfszb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275264/place_photos/q8scj3on406zydfa7vql.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275264/place_photos/z67khfsd7d3j6rzghbyc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275265/place_photos/uppitia4zslxrqxyxdet.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275265/place_photos/w8fpggjoifoyo6mcstji.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1686275263/place_photos/qfdt2oyey1ztybvgota0.jpg",
    ],
    placeId: "ChIJe3CduZvbdDEReFUDpMNGsek",
    plusCode: {
      compoundCode: "XRV2+MQ Vĩnh Cửu, Đồng Nai, Việt Nam",
      globalCode: "7P28XRV2+MQ",
    },
    addressComponents: [
      {
        longName: "164",
        shortName: "164",
        types: ["street_number"],
      },
      {
        longName: "Đường tỉnh 768",
        shortName: "ĐT768",
        types: ["route"],
      },
      {
        longName: "Vĩnh Cửu",
        shortName: "Vĩnh Cửu",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("648fbb0483fc695849194553"),
    geometry: {
      location: {
        lat: 10.8773033,
        lng: 106.8718031,
      },
      viewport: {
        northeast: {
          lat: 10.8786906802915,
          lng: 106.8733135802915,
        },
        southwest: {
          lat: 10.8759927197085,
          lng: 106.8706156197085,
        },
      },
    },
    name: "Siêu Công Viên Nước The Amazing Bay - Vịnh Kỳ Diệu",
    url: "https://maps.google.com/?cid=15834631623608105193",
    website: "https://www.theamazingbay.com/",
    isRecommended: true,
    phoneNumber: "1900 633087",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141119/place_photos/pvh5rl93qg0teoeuw09p.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141120/place_photos/gmosvn9gymndntt0hils.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141119/place_photos/jijp3voaaxi3dawlocn8.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141119/place_photos/ahmwnfbkgxhrimrysfus.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141120/place_photos/ncvfiqhf8mupx8qmm4vs.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141120/place_photos/pcfcffsx5haosre3rxfi.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141119/place_photos/le6hdigs6c3ohcfrb4gt.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141119/place_photos/vcyweuy9gxku3pcjdafu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141120/place_photos/wndpv8penvptgyyonury.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141119/place_photos/sdbcumkpsu1pzv5e6jtl.jpg",
    ],
    placeId: "ChIJs9UW897fdDER6fhT8pDpv9s",
    plusCode: {
      compoundCode: "VVGC+WP Long Thành, Đồng Nai, Việt Nam",
      globalCode: "7P28VVGC+WP",
    },
    addressComponents: [
      {
        longName: "Quốc lộ 51",
        shortName: "Quốc lộ 51",
        types: ["route"],
      },
      {
        longName: "Khu phố 4",
        shortName: "Khu phố 4",
        types: ["neighborhood", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["amusement_park"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("648fbb4783fc695849194556"),
    geometry: {
      location: {
        lat: 10.8967246,
        lng: 106.8891785,
      },
      viewport: {
        northeast: {
          lat: 10.8980461802915,
          lng: 106.8905516302915,
        },
        southwest: {
          lat: 10.8953482197085,
          lng: 106.8878536697085,
        },
      },
    },
    name: "Khu du lịch - đô thị Sơn Tiên",
    url: "https://maps.google.com/?cid=3752015391558224149",
    website: "https://www.theamazingbay.com/",
    isRecommended: false,
    phoneNumber: "0385 711 212",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141185/place_photos/vpzvkzea8cut17j1gbyg.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141185/place_photos/a6gn0bvjv9kyigdcf2nj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141185/place_photos/mwh66l5jrznzf0jjf72o.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141185/place_photos/asajuowsvcnnyybtvqlb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141186/place_photos/rhkolhvkjji1ftdkggdn.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141185/place_photos/zri9hjgieyp81dqz4vwj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141185/place_photos/u2lihwdsqjj4nng6ptjs.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141184/place_photos/ha6j3uo2vmv7ydxhi7ar.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141185/place_photos/wojpgfpvd1lgizhv9izw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687141186/place_photos/ngeueojbsxzpnt3a46dk.jpg",
    ],
    placeId: "ChIJDQ6O5p7fdDERFUmgnR7WETQ",
    plusCode: {
      compoundCode: "VVWQ+MM thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28VVWQ+MM",
    },
    addressComponents: [
      {
        longName: "Quốc lộ 51",
        shortName: "QL51",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["amusement_park", "lodging"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6496d3e2ca50497414065029"),
    geometry: {
      location: {
        lat: 10.9563808,
        lng: 106.8571664,
      },
      viewport: {
        northeast: {
          lat: 10.9578076802915,
          lng: 106.8584998302915,
        },
        southwest: {
          lat: 10.9551097197085,
          lng: 106.8558018697085,
        },
      },
    },
    name: "Cafe Vườn cá",
    url: "https://maps.google.com/?cid=11967970312101271039",
    isRecommended: false,
    website: null,
    phoneNumber: "090 847 57 35",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/yvsfzflq6tzjgqfvtuiy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/e2g3bwvnsdf54z5jx62n.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/polpv0oqnypur8v1olbx.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/kq4gjcrislgw2s768o34.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/dengvig6zqv4tcawxxp9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/hrqmp90dgfctmold80or.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/xt7rfmp3uzaizc1xeogr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/nyzhjyw3byevl05nekqf.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/c6y8sphsflnnjcakbbn3.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606239/cwxuktjxdv3qsxblfrny.jpg",
    ],
    placeId: "ChIJ482bb-_ddDER_5U3_5bFFqY",
    plusCode: {
      compoundCode: "XV44+HV Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XV44+HV",
    },
    addressComponents: [
      {
        longName: "26/2",
        shortName: "26/2",
        types: ["street_number"],
      },
      {
        longName: "Hẻm 26 Lý Văn Sâm",
        shortName: "Hẻm 26 Lý Văn Sâm",
        types: ["route"],
      },
      {
        longName: "KP 5",
        shortName: "KP 5",
        types: ["neighborhood", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6496d404ca5049741406502c"),
    geometry: {
      location: {
        lat: 10.9545259,
        lng: 106.825648,
      },
      viewport: {
        northeast: {
          lat: 10.9559290302915,
          lng: 106.8269587302915,
        },
        southwest: {
          lat: 10.9532310697085,
          lng: 106.8242607697085,
        },
      },
    },
    name: "Z!CAFE Ngô Quyền",
    url: "https://maps.google.com/?cid=13124052503033730537",
    isRecommended: false,
    website: null,
    phoneNumber: "093 300 99 66",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606273/smccriubcavyhduqojdq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606272/m7jg06jwxbwllhzea1rk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606272/wzlce9uu02lmpnxdydz7.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606272/cnu4mfguscekre6pzxo4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606273/fkzjqgn7gypqesdjo4i4.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606272/pvocxeapzv03vr9lhjub.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606272/po8jzwkcvjus0sxutuvz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606272/frg8xlkzip5bvupilpve.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606273/qcbmnrvr9puybinomlz1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687606273/gaobrbfyypuaqmopjmp9.jpg",
    ],
    placeId: "ChIJfa8xyq7edDER6dXmoDcAIrY",
    plusCode: {
      compoundCode: "XR3G+R7 Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XR3G+R7",
    },
    addressComponents: [
      {
        longName: "328",
        shortName: "328",
        types: ["street_number"],
      },
      {
        longName: "Ba Mươi Tháng Tư",
        shortName: "Ba Mươi Tháng Tư",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6496eee0ca5049741406502f"),
    geometry: {
      location: {
        lat: 10.9428135,
        lng: 106.8296482,
      },
      viewport: {
        northeast: {
          lat: 10.9441117302915,
          lng: 106.8310094802915,
        },
        southwest: {
          lat: 10.9414137697085,
          lng: 106.8283115197085,
        },
      },
    },
    name: "Mr.Huy roastery the advance ( Võ Thị Sáu )",
    url: "https://maps.google.com/?cid=14752269225509044730",
    isRecommended: false,
    website: null,
    phoneNumber: "093 382 58 74",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613102/ybbphrpil3nrzdgyce2c.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613103/ghmf5rhmsupuv4kxtw7z.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613105/f46iyochj6kmft7jmy0u.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613102/o6abwwysxzn5jglhsxwz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613101/mh5ygtpmxukgfbvx4lcy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613124/s5rgnvuenyxmr1byf9wc.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613102/hzfgpahilckxye6rosx9.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613110/rdamdeb05wlfeskrsawj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613107/iufofhgmi5rgtvyz57i2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687613103/pzznnt5sfvphfycwdkd9.jpg",
    ],
    placeId: "ChIJS4Oy-TjfdDER-sFkIbOWusw",
    plusCode: {
      compoundCode: "WRVH+4V thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28WRVH+4V",
    },
    addressComponents: [
      {
        longName: "Đường Võ Thị Sáu",
        shortName: "Đ. Võ Thị Sáu",
        types: ["route"],
      },
      {
        longName: "phường Thống Nhất",
        shortName: "phường Thống Nhất",
        types: ["sublocality_level_1", "sublocality", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "810000",
        shortName: "810000",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("64971e75ca50497414065032"),
    geometry: {
      location: {
        lat: 10.9785343,
        lng: 106.8705326,
      },
      viewport: {
        northeast: {
          lat: 10.9798901802915,
          lng: 106.8718436302915,
        },
        southwest: {
          lat: 10.9771922197085,
          lng: 106.8691456697085,
        },
      },
    },
    name: "Coffe garden",
    url: "https://maps.google.com/?cid=895830486355328874",
    isRecommended: false,
    website: null,
    phoneNumber: null,
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/usm1t1azjrnubqkxrjtk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/xpw95gkikb8m8eyfp7dk.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/kmjun5jr3p6jrvbj23pq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/s5gfm9sxth8vao6t0ncb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/rpymg7wdfvzhchfxddap.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/pmp2rzjqoasydckujfsf.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/s4orjxwhovpzcchooids.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/onljlxg5apumvl1vw6zu.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/aydgzpxx4izc9tmh8zrz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687625329/cmpxklnpuntyuxdqktlr.jpg",
    ],
    placeId: "ChIJQWDZ9nDddDERar8svhShbgw",
    plusCode: {
      compoundCode: "XVHC+C6 Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XVHC+C6",
    },
    addressComponents: [
      {
        longName: "10",
        shortName: "10",
        types: ["subpremise"],
      },
      {
        longName: "10",
        shortName: "10",
        types: ["street_number"],
      },
      {
        longName: "Khu Phố 5",
        shortName: "Khu Phố 5",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6497ad7e8fe5181d61d3c3eb"),
    geometry: {
      location: {
        lat: 10.9472997,
        lng: 106.8300955,
      },
      viewport: {
        northeast: {
          lat: 10.9487445302915,
          lng: 106.8314226302915,
        },
        southwest: {
          lat: 10.9460465697085,
          lng: 106.8287246697085,
        },
      },
    },
    name: "The Coffee House - Võ Thị Sáu",
    url: "https://maps.google.com/?cid=9531616707453231674",
    website: "http://www.thecoffeehouse.com/",
    isRecommended: false,
    phoneNumber: "028 7303 9079",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/jkhibt8suzth8e8btv9y.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/ehlkqef4zlcauo2mnfq2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/srx7rmoosj4vc1tjpa9n.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/sijsltwmeuybm1hbzb5x.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/kwudsfcwcyc7kmcepv4v.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661946/k40uzkdubnhuaivotawy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/f5vc2mm5ey6jkegzah6v.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/m7hp3ebwyps9r13snfaq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/t0me7pvqg0wknf9vwgie.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687661947/yq4jj89f5a4pmq7dmrj9.jpg",
    ],
    placeId: "ChIJNTw2e6XedDEROqLtDuUaR4Q",
    plusCode: {
      compoundCode: "WRWJ+W2 Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28WRWJ+W2",
    },
    addressComponents: [
      {
        longName: "284",
        shortName: "284",
        types: ["street_number"],
      },
      {
        longName: "Đường Võ Thị Sáu",
        shortName: "Đ. Võ Thị Sáu",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
      {
        longName: "700000",
        shortName: "700000",
        types: ["postal_code"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6497bfb08fe5181d61d3c3ee"),
    geometry: {
      location: {
        lat: 10.9644764,
        lng: 106.9133846,
      },
      viewport: {
        northeast: {
          lat: 10.9658296802915,
          lng: 106.9147081802915,
        },
        southwest: {
          lat: 10.9631317197085,
          lng: 106.9120102197085,
        },
      },
    },
    name: "Cà phê Hoa Giấy",
    url: "https://maps.google.com/?cid=1274453537333516561",
    isRecommended: false,
    website: null,
    phoneNumber: null,
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/ci7wnmwqcrkq9hpqvrhv.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/uk7ygvdo2jvxjxdkofyp.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/kamadnosseplo66mky9f.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666605/jkcps8smlvw0tolhx8so.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/fq9uutdf5o3qi8emfco3.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/ilkm4wrpajvot9e7rqcp.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/wrb7zmzqj8fluj3yleyy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/d3hbddoygtkshxi58skm.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/fjvhboor16dbalmdpq0y.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666606/nhrcjce6oqbrkfxsnznq.jpg",
    ],
    placeId: "ChIJYX0BcFjndDERERmBZ73ErxE",
    plusCode: {
      compoundCode: "XW77+Q9 thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XW77+Q9",
    },
    addressComponents: [
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("6497c03f8fe5181d61d3c3f1"),
    geometry: {
      location: {
        lat: 10.9543153,
        lng: 106.8661812,
      },
      viewport: {
        northeast: {
          lat: 10.9557037802915,
          lng: 106.8675442302915,
        },
        southwest: {
          lat: 10.9530058197085,
          lng: 106.8648462697085,
        },
      },
    },
    name: "Cafe võng 68",
    url: "https://maps.google.com/?cid=8032337491434017216",
    isRecommended: false,
    website: null,
    phoneNumber: "094 828 71 58",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/dr3ucn69l3ovi4yplrux.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/bhpiwt8azvumdwkcjtzw.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/n8srwrg1qku2xxh0knus.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/tpbkinpohid4fewlwmkl.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/ep1tavwnkzcizkwchs3w.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/ykwpjoclywdh0murpis2.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/ygmrryudzta8664pmyrr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/x7jisrs1dwjdbpgij9ft.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/lutudsbqeu744vteeonb.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687666748/vggy821mgtqeeyoks9o1.jpg",
    ],
    placeId: "ChIJ5__GQ2jddDERwBH6LGSYeG8",
    plusCode: {
      compoundCode: "XV38+PF Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XV38+PF",
    },
    addressComponents: [
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["coffee_shop"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("649a96e2ad057e04eb71e74f"),
    geometry: {
      location: {
        lat: 11.0183166,
        lng: 107.2539314,
      },
      viewport: {
        northeast: {
          lat: 11.01974573029151,
          lng: 107.2551755802915,
        },
        southwest: {
          lat: 11.0170477697085,
          lng: 107.2524776197085,
        },
      },
    },
    name: "Du lịch vườn thị xã Long Khánh Chú Lộc La",
    url: "https://maps.google.com/?cid=15407611803402536399",
    isRecommended: false,
    website: null,
    phoneNumber: "0343 010 148",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852766/eqi9oebc9upus6pmkj0i.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852765/oqssli4kuu9ldqnwalqs.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852765/yjigx7sofmoieodgrttq.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852765/wxc6y6cywayyg6p6vcso.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852765/dvb3ciiykrgxewr7wyc6.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852766/ilo9prjudrzpxzm4t0lp.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852766/ebfrdpkkuxcu2e25qdhm.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852766/gmzg4vt5yzwudkxplcg0.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852766/l5bbkqrezkntil8r2vhv.png",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687852765/covolbsqb17l0gpexske.png",
    ],
    placeId: "ChIJy7Q_aJX5dDERz4XsWk3V0tU",
    plusCode: {
      compoundCode: "2793+8H Thống Nhất, Đồng Nai, Việt Nam",
      globalCode: "7P392793+8H",
    },
    addressComponents: [
      {
        longName: "xã",
        shortName: "xã",
        types: ["point_of_interest"],
      },
      {
        longName: "ấp",
        shortName: "ấp",
        types: ["street_number"],
      },
      {
        longName: "Cây Da",
        shortName: "Cây Da",
        types: ["route"],
      },
      {
        longName: "Bình Lộc",
        shortName: "Bình Lộc",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["tourist_area", "ecotourism"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("649eccea2b4554b1e65ae8f5"),
    geometry: {
      location: {
        lat: 10.9681885,
        lng: 106.7973167,
      },
      viewport: {
        northeast: {
          lat: 10.9695486802915,
          lng: 106.7986599302915,
        },
        southwest: {
          lat: 10.9668507197085,
          lng: 106.7959619697085,
        },
      },
    },
    name: "Quán cơm 135",
    url: "https://maps.google.com/?cid=8653707836265096561",
    isRecommended: false,
    website: null,
    phoneNumber: "097 671 89 87",
    photos: [],
    placeId: "ChIJ8YdGlK7bdDERcWWYgm0lGHg",
    plusCode: {
      compoundCode: "XQ9W+7W Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XQ9W+7W",
    },
    addressComponents: [
      {
        longName: "Huỳnh Văn Nghệ",
        shortName: "Huỳnh Văn Nghệ",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["restaurant"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("64bcf7f71f79226ff002ab7a"),
    geometry: {
      location: {
        lat: 10.962795,
        lng: 106.9401415,
      },
      viewport: {
        northeast: {
          lat: 10.9642372802915,
          lng: 106.9415193302915,
        },
        southwest: {
          lat: 10.9615393197085,
          lng: 106.9388213697085,
        },
      },
    },
    name: "Quán Ốc Ngon",
    url: "https://maps.google.com/?cid=6136467049684684170",
    website: "https://ocngon.business.site/",
    isRecommended: false,
    phoneNumber: "0839 080 838",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105845/qn3eux8jovljinnhuuv1.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105845/ynrx0fwi61gghd6fo9l3.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105846/xk994crcn77wm7pipdlp.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105843/filyrduu76opnkyn2mls.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105843/uodt0bl51xtavrgodiaq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105845/rbvsscikyizmiwiqtram.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105844/tle5kbtp6ahp698fcnib.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105845/lxjg0utzymfc3f3bjkx3.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105845/xfdu0ukqee4ucc0rpnz6.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690105844/fijzhvpxfaqgsaf2fw88.jpg",
    ],
    placeId: "ChIJx3jxCALkdDERik1Y8EQcKVU",
    plusCode: {
      compoundCode: "XW7R+43 Trảng Bom, Đồng Nai, Việt Nam",
      globalCode: "7P28XW7R+43",
    },
    addressComponents: [
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Trảng Bom",
        shortName: "Trảng Bom",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["restaurant"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("64bd376c1f79226ff002ab7f"),
    geometry: {
      location: {
        lat: 11.2307332,
        lng: 107.4410645,
      },
      viewport: {
        northeast: {
          lat: 11.2323439302915,
          lng: 107.4423185802915,
        },
        southwest: {
          lat: 11.2296459697085,
          lng: 107.4396206197085,
        },
      },
    },
    name: "KDL Suối Mơ - Đồng Nai",
    url: "https://maps.google.com/?cid=17170253300795990368",
    website: "http://suoimopark.com/",
    isRecommended: false,
    phoneNumber: "0251 3697 025",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122087/ql967pgqt3roout3fym0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122087/usjoflkjopukdbnjmfcz.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122090/wmuprysgukfsdmiynzik.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122090/nlcjycsp5xcvvjlkr0mo.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122090/ynip8nnuyovagjknebbh.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122088/o060bmzeyla00yyid0me.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122090/quvbkl7f3xdvdsbkwl4v.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122088/smoinqhictmygdj84xp7.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122091/j3aecszpal4rkowm8xgy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122089/ifrx7xtihn730tn5heam.jpg",
    ],
    placeId: "ChIJSycJ3FZmdDERYGFsuWf-SO4",
    plusCode: {
      compoundCode: "6CJR+7C Tân Phú, Đồng Nai, Việt Nam",
      globalCode: "7P396CJR+7C",
    },
    addressComponents: [
      {
        longName: "Trà Cổ",
        shortName: "Trà Cổ",
        types: ["route"],
      },
      {
        longName: "Tân Phú",
        shortName: "Tân Phú",
        types: ["administrative_area_level_2", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["ecotourism", "park"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
  {
    _id: ObjectId("64bd39751f79226ff002ab8b"),
    geometry: {
      location: {
        lat: 10.9607851,
        lng: 106.8431711,
      },
      viewport: {
        northeast: {
          lat: 10.9621251802915,
          lng: 106.8445631802915,
        },
        southwest: {
          lat: 10.9594272197085,
          lng: 106.8418652197085,
        },
      },
    },
    name: "Quán Ăn Vặt Shin",
    url: "https://maps.google.com/?cid=10835731571537530079",
    website: "https://www.facebook.com/quananvatshin/",
    isRecommended: false,
    phoneNumber: "093 430 03 30",
    photos: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122608/wsheicd4tmsveayhpqau.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122608/fbyxydmpiuoura8enkth.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122606/xtpxbbhcwxfguld3fwna.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122608/p6posnsj5hetovspu3yq.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122607/qrgpvanjxbbjklni0maj.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122606/zgzibecz6mzhvckoftg0.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122607/r0zmg9cojqjnh32rgzsy.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122607/wawrqtqmxx0wlw9es6ft.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122608/fchf4h043a4q4ho7n7ig.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1690122607/ponjcvohnfcjly2xztbm.jpg",
    ],
    placeId: "ChIJeUC3iyHcdDER38z6QnRAYJY",
    plusCode: {
      compoundCode: "XR6V+87 Thành phố Biên Hòa, Đồng Nai, Việt Nam",
      globalCode: "7P28XR6V+87",
    },
    addressComponents: [
      {
        longName: "18",
        shortName: "18",
        types: ["street_number"],
      },
      {
        longName: "Đường Dương Tử Giang",
        shortName: "Đ. Dương Tử Giang",
        types: ["route"],
      },
      {
        longName: "thành phố Biên Hòa",
        shortName: "Tp. Biên Hòa",
        types: ["locality", "political"],
      },
      {
        longName: "Đồng Nai",
        shortName: "Đồng Nai",
        types: ["administrative_area_level_1", "political"],
      },
      {
        longName: "Việt Nam",
        shortName: "VN",
        types: ["country", "political"],
      },
    ],
    content: {
      vi: "",
      en: "",
    },
    typeIds: ["restaurant"].map((type) => {
      return placeTypes.find((placeType) => placeType.value === type)._id;
    }),
    updatedAt: new Date("01-01-2025").getTime(),
    createdAt: new Date("01-01-2025").getTime(),
  },
];

const blogs = [
  {
    _id: ObjectId(),
    authorId: users[0]._id,
    typeId: blogTypes.find((type) => type.value === "review")._id,
    mentionedPlaceIds: [
      places.find((place) => place.name === "Ta Lai Longhouse")._id,
    ],
    name: "Ta Lai Longhouse, trải nghiệm đáng nhớ với thiên nhiên, văn hoá, con người",
    content:
      "### Review Ta Lai Longhouse\n\nTa Lai Longhouse là một điểm đến du lịch thú vị tại Vườn quốc gia Nam Cát Tiên, Đồng Nai, Việt Nam. Với kiến trúc kiểu dáng truyền thống của người dân tộc Châu Mạ, nơi đây mang đến cho du khách một trải nghiệm độc đáo về văn hóa và lối sống của người dân tộc miền núi.\n\n![](http://res.cloudinary.com/dbtb0sjby/image/upload/v1687161126/blog_photos/pve72qerisk2voiymlze.jpg)\n\nTai Lai Longhouse được xây dựng trên một khu đất rộng lớn, bao gồm nhiều căn nhà dài hẹp kết nối với nhau bằng hành lang. Mỗi căn nhà đều được trang trí bằng những đồ vật truyền thống như đèn tre, chum cúc, và những tác phẩm thủ công mỹ nghệ đầy màu sắc. Các phòng ngủ cũng được trang bị đầy đủ tiện nghi và thoải mái để du khách có thể nghỉ ngơi sau một ngày khám phá vườn quốc gia.\n\n\nNgoài ra, tại đây còn có nhiều hoạt động thú vị như tham quan làng chài bản địa, tắm suối, đi bộ đường mòn và lặn đêm để nghe tiếng hót của các loài chim đêm. Đặc biệt, du khách có thể tham gia trại trẻ em tại đây để học hỏi và chia sẻ với các em nhỏ về văn hóa và đời sống của người dân tộc miền núi.\n\n\nKhông chỉ mang đến cho du khách một trải nghiệm về văn hóa và lối sống của người dân tộc, Tai Lai Longhouse còn giúp bảo tồn và phát triển các giá trị văn hóa truyền thống. Với cách tiếp cận này, du khách có thể tìm hiểu và trải nghiệm văn hóa một cách trực tiếp, đồng thời cũng giúp cho các cộng đồng bản địa phát triển và giữ gìn những giá trị truyền thống của mình.\n\n\nTổng kết lại, Tai Lai Longhouse là một điểm đến hấp dẫn cho những ai yêu thích văn hóa và thiên nhiên. Nơi đây mang đến cho du khách một trải nghiệm độc đáo và giá trị về văn hóa của người dân tộc miền núi, đồng thời còn giúp bảo tồn và phát triển văn hoá bản địa của đất nước Việt Nam.",
    coverImage:
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687161128/blog_photos/ee94b1vx4vr4vwddu2rt.jpg",
    images: [
      "https://holidayarchitects.co.uk/vietnam/wp-content/uploads/sites/21/2015/01/Ta-Lai-exo4-500x300.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0c/c2/11/45/inside-the-longhouse.jpg",
      "https://holidayarchitects.co.uk/vietnam/wp-content/uploads/sites/21/2015/01/Ta-Lai-exo3-500x300.jpg",
      "https://live.staticflickr.com/7649/16900813361_c2105ea17d.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/38/f2/2c/ta-lai-longhouse.jpg?w=700&h=-1&s=1",
    ],
    readTime: 108,
    isApproved: true,
    updatedAt: new Date("01-03-2025").getTime(),
    createdAt: new Date("01-03-2025").getTime(),
  },
  {
    _id: ObjectId(),
    authorId: users[0]._id,
    typeId: blogTypes.find((type) => type.value === "review")._id,
    mentionedPlaceIds: [
      places.find((place) => place.name === "Paradise on the Tree")._id,
    ],
    name: "Sống với thiên nhiên tại Paradise on the tree",
    content:
      "### Review về Paradise on the Tree\nKhu nghỉ dưỡng sang trọng nhưng gần gủi với thiên nhiên ở gần vườn quốc gia **Nam Cát Tiên**, **Đồng Nai**.\n\nNếu bạn đang tìm kiếm một nơi nghỉ dưỡng gần với thiên nhiên tại Đồng Nai, **Paradise on the Tree** là một lựa chọn tuyệt vời cho bạn. Nơi đây tọa lạc gần vườn quốc gia Nam Cát Tiên, khu vực đầy hoang dã và hấp dẫn với những khung cảnh thiên nhiên độc đáo.\n\nVới kiến trúc hiện đại, nhưng vẫn giữ được trọn vẹn vẻ đẹp của thiên nhiên, **Paradise on the Tree** cung cấp những tiện ích hoàn hảo nhất để bạn có thể tận hưởng kì nghỉ một cách tuyệt vời nhất. Không gian nơi đây rộng rãi, thoáng mát, với hồ bơi lớn cùng các dịch vụ tiện ích khác như nhà hàng, quầy bar và chỗ hút thuốc sẽ đem lại cảm giác thư giãn tuyệt đối cho bạn.\n\nCác thiết kế phòng ở đây đều cho phép tầm nhìn tuyệt đẹp đến rừng núi phía xa và thiên nhiên xung quanh. Các phòng tại **Paradise on the Tree** được thiết kế rộng rãi, thoáng mát và sang trọng. Các tiện nghi trong phòng đều được cung cấp hoàn toàn miễn phí bao gồm cả đồ dùng như dép cao su, điều hòa nhiệt độ và đồ dùng tắm rửa cá nhân.\n\nNgoài ra, **Paradise on the Tree** cũng có một số những hoạt động dã ngoại tuyệt vời như đi bộ đường mòn trong rừng, tắm suối và chiêm ngưỡng thiên nhiên. Bạn cũng có thể thuê xe đạp và tự khám phá vùng đất hoang sơ xung quanh.\n\nVới các hoạt động và tiện ích đầy đủ, **Paradise on the Tree** mang lại cho bạn sự thoải mái và thư giãn tuyệt đối trong kì nghỉ của mình. Nếu bạn đang tìm kiếm một nơi để nghỉ dưỡng với thiên nhiên tuyệt vời, **Paradise on the Tree** chính là lựa chọn hoàn hảo.",
    coverImage:
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687164524/blog_photos/lyjvwqu1wpku3cfjazca.jpg",
    images: [
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687164523/blog_photos/pytphagzmfvzms8rt6jr.jpg",
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687164523/blog_photos/xcvjpzobzlbthdjfozkx.jpg",
      "https://paradise-on-the-tree-cat-tien.hotelmix.vn/data/Photos/OriginalPhoto/15656/1565664/1565664670/Paradise-On-The-Tree-Apartment-Cat-Tien-Exterior.JPEG",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/541578472.jpg?k=8d255f90f74038914df18a787a64974dcac6b9e6634b7ebab57f924d932d6606&o=&hp=1",
      "https://paradise-on-the-tree-cat-tien.hotelmix.vn/data/Photos/OriginalPhoto/15656/1565664/1565664652/Paradise-On-The-Tree-Apartment-Cat-Tien-Exterior.JPEG",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/507836722.jpg?k=1e359d28d7d467e0dbb5e88e83d1df3f65a8ffcddc285a914afff08d3db7f0c7&o=&hp=1",
    ],
    readTime: 101,
    isApproved: true,
    updatedAt: new Date("01-03-2025").getTime(),
    createdAt: new Date("01-03-2025").getTime(),
  },
  {
    _id: ObjectId(),
    authorId: users[0]._id,
    typeId: blogTypes.find((type) => type.value === "review")._id,
    mentionedPlaceIds: [
      places.find((place) => place.name === "Thác Đá Hàn")._id,
    ],
    name: "Review Tham Quan khu thác Đá Hàn Đồng Nai ở đâu, giá vé, check in, vui chơi 2022",
    content:
      "[Thác đá hàn](https://bietthungoctrai.vn/khu-thac-da-han-dong-nai/), Đồng Nai là một điểm đến du lịch mới mẻ mang vẻ đẹp thiên nhiên cao thượng với phong cảnh hương đồng gió nội khó cưỡng, cảnh quan sơn thủy hữu tình cùng vườn cây ăn trái trĩu quả nên chắc như đinh đóng cột được xem là nơi lý tưởng để cắm trại dã ngoại thời điểm cuối tuần Nếu bạn là người yêu thiên nhiên, yêu hương đồng gió nội và vào các kì nghỉ ngắn bạn có nhu cầu muốn được hòa tâm hồn với thiên nhiên thì thác Đá Hàn này là một nhắc nhở tuyệt đối dành riêng cho bạn.\n\n## Thác Đá Hàn Đồng Nai ở đâu?\n\n_**Thác Đá Hàn Đồng Nai**_ tọa lạc cách thức TP.HCM khoảng 70km, tọa lạc tại Tổ 15 – Ấp 5, Sông Trầu, thị trấn Trảng Bom, huyện Trảng Bom, tỉnh Đồng Nai. \n\n## Giới thiệu khu du lịch thác Đá Hàn\n\nThác Đá Hàn bao gồm 3 dòng thác: thác Chàng, thác Nàng, thác Đá Hàn. Theo truyền thuyết, thời trước chính là địa điểm dân cư tộc Mạ sinh sống. Những đôi trai gái yêu nhau nhưng chưa được hộ dân cư chấp nhận, chớ nên duyên bà xã chồng nên chọn cách thức gieo mình xuống dòng thác để bảo đảm tình yêu của mình.\n\nChính thế cho nên hai dòng thác Chàng và thác Nàng nói một cách khác là thác đôi. Thác tọa lạc giữa vườn cây ăn trái của các dân cư nên hành trình chinh phục thác mát dịu, thơm phức.\n\nỞ kề bên thác nước, bạn cũng tiếp tục bắt gặp tấm hình một con suối mộng mơ không hề kém tọa lạc uốn lượn giữa các lùm cây cỏ.\n\nNgồi ở cạnh bên con suối, dưới bóng cây rợp mát, lắng nghe tiếng chim hót líu lo, tiếng suối róc rách các bạn sẽ có cảm xúc như bị lạc vào rừng sâu.\n\nVới khoảng trống sinh thái phong phú, cảnh quan thiên nhiên phong phú và đa dạng thơ mộng cùng các dịch vụ tham quan du lịch hấp dẫn, giá trị đi lại ăn ở thấp, thác Đá Hàn này là nơi ăn chơi nghỉ ngơi hoàn hảo nhất vào các dịp lễ hay thời điểm cuối tuần\n\n## Lối đi thác Đá Hàn Đồng Nai\n\nThác Đá Hàn khá gần Sài Gòn nên các bạn cũng tồn tại thể áp dụng các phương tiện đi lại cá thể như mô tô, ôtô riêng để dịch rời.\n\nChúng ta đi theo lộ trình: Từ Sài Gòn đuổi theo đại lộ 1A vào địa bàn thị trấn Trảng Bom, tiếp sau đó liên tục đi đến nhà văn hóa truyền thống cổ truyền huyện Trảng Bom hoặc ủy ban nhân dân huyện Trảng Bom thì hỏi đường tới ngã ba Cây Gáo. Từ ngã ba Cây Gáo rẽ vào tuyến đường nhỏ dại khoảng 3km sẽ cảm nhận biển chỉ dẫn tới khu du lịch thác Đá Hàn. Từ đây bạn rẽ trái theo biển chỉ đường rồi trải qua hồ Sông Mây khoảng 5km là đến địa điểm. Để tới được thác Đá Hàn, bạn cần phải đánh bại tuyến đường đá đỏ hoang vu khoảng 500m cảm xúc khá thích thú\n\n## Giá vé dịch vụ khu du lịch Thác Đá Hàn Đồng Nai\n\nVé vào cổng:\n\n- Ngày thường: 15.000 đồng/vé\n- Cuối tuần: 20.000 đồng/vé\n- Ngày lễ: 25.000 đồng/vé\n- Thuê áo phao + tắm lại: 20.000 đồng/vé\n- Bể bơi: 25.000 đồng/vé\n- Câu cá: 40.000 đồng/vé\n- Thuê xe đạp địa hình: 50.000/3 giờ\n- Đua xe ôtô Offord: 200.000/hành trình.\n- Thuê chòi dừng chân: 50.000-70.000/chòi (giá mọi hôm)\n- Thuê lều: 50.000-60.000/lều (giá mọi hôm)\n\n## Vui chơi ở thác Đá Hàn\n\nSau khi dạo một vòng quanh khu du lịch sinh thái Thác, chọn ngay một nhà chòi ven bờ suối để nghỉ dưỡng nhé. Nếu chuyển dời nhiều người bạn cũng tồn tại thể tổ chức dựng lều cắm trại. Giá thuê chòi là 50k-70k còn thuê lều từ 50k-60k tùy ngày.\n\nTắm thác là vận động vui chơi đã không còn gì thiếu trong lịch trình tìm hiểu thác Đá Hàn. Sau khi khó khăn chinh phục tuyến đường tới thác, sẽ thật sảng khoái nếu bạn được đắm mình trong làn nước mát lạnh của thác đá hay vươn mình mát xa bỗng nhiên dưới các làn nước đang đổ từ trên cao xuống, ngụp lặn giữa hồ nước trong suốt của thác Đá Hàn.\n\nCheck-in thác Đá Hàn, khách tham quan tha hồ “xõa nước” với thác nước và bể bơi, vui chơi với dịch vụ câu cá, đi chợ quê miệt vườn, lượn lờ bơi lội,…. Hay đăng ký các trò chơi mạo hiểm như đua ôtô off road, đi xe đạp địa hình,.. .\n\nĐặc điểm, tới đây bạn đừng bỏ qua vụ vui chơi ngâm mình dưới thác nước bỗng nhiên. Sau khi tất bật với các hoạt động sinh hoạt giả trí trên cạn, các bạn sẽ cảm nhận sảng khoái khi đắm mình trong làn nước mát lạnh của thác.\n\nNhững thánh sống ảo được chụp choẹt với thác nước, cây cầu, dãy xích đu đầy Màu sắc. Chắc chắn các bạn sẽ có các đáng nhớ đáng nhớ ở đây.\n\nCảm xúc để nước dội vào vai, vào cổ mạnh mẽ và uy lực mà mềm mại và mượt mà như đang sẵn có ai đấm bóp không riêng gì tẩy sạch bụi bờ mà các nỗi ưu phiền, stress cũng Từ đó mà trôi đi hết\n\nSau khi tắm thác, bạn cũng tồn tại thể thuê lều nghỉ dưỡng, lượn lờ bơi lội, đăng ký các hoạt động sinh hoạt thư giãn nhẹ dịu như: câu cá vui chơi, đi chợ quê miệt vườn… hoặc thử thách bản thân với nhiều trò chơi mạo hiểm đầy thích thú như: đạp xe địa hình, đua ôtô offroad…\n\nMột số trong những thông tin về giá dịch vụ khách tham quan rất có thể tìm hiểu thêm: Vé bể bơi 25k, thuê áo phao + tắm lại 20k, xe đạp địa hình 50k/ 3 giờ, trò đua xe ôtô off-road là 200k/ hành trình, câu cá bao gồm cần câu và mồi câu là 40k. Ngoài ra, nếu cắm trại nhiều người, tất cả chúng ta cũng tồn tại thể tổ chức các trò chơi tập thể nữa.\n\nNhững bạn cũng tồn tại thể chọn một nhà chòi ven bờ suối bất kì để nghỉ dưỡng hoặc tổ chức cắm trại, dựng lều trong vườn trái cây, bãi cỏ, vườn thông. Du khách rất có thể chuẩn bị thức ăn, thức uống dã ngoại đưa đi hoặc mua tại thác Đá Hàn. Ngay cạnh thác có nhà hàng quán ăn luôn chuẩn bị đáp ứng 24/24 nhiều đồ ăn đặc thù miệt vườn đậm chất miền quê, giá trị phải chăng\n\nThác tọa lạc giữa vườn cây ăn trái của các dân cư nên bạn cũng tồn tại thể phối kết hợp tham quan thác đá với tham quan vườn trái cây của các dân cư. Nếu chuyển dời vào chính xác ngày thu hoạch, trước mắt các bạn sẽ là khu vườn sai trĩu các loại quả: sầu riêng, măng cụt, chôm chôm… Tùy các mùa mà vườn cây sai quả, kết thành từng chùm nặng trĩu trên cây. Bạn cũng tồn tại thể tự sướng lưu niệm, thưởng thức trái cây tại vườn hoặc mua về làm quà\n\nBắt cá dưới bùn là một trò chơi khá thích thú khi đi du lịch thác Đá Hàn nếu như với các bạn trẻ thành phố tuổi thơ chưa một lần được đi bắt cá. Tuy nhiên, nếu có dự định đăng ký trò này thì bạn nên có sự sẵn mấy bộ quần áo và bột giặt thơm còn nếu như không muốn khắc ghi mùi bùn.",
    coverImage:
      "http://res.cloudinary.com/dbtb0sjby/image/upload/v1687842789/blog_photos/lpf4kto8lsbffthrgajy.png",
    images: [
      "https://bietthungoctrai.vn/wp-content/uploads/anh1.png",
      "https://bietthungoctrai.vn/wp-content/uploads/anh13.png",
      "https://bietthungoctrai.vn/wp-content/uploads/anh9.png",
      "https://bietthungoctrai.vn/wp-content/uploads/anh6.png",
      "https://bietthungoctrai.vn/wp-content/uploads/anh8.png",
      "https://bietthungoctrai.vn/wp-content/uploads/anh2.png",
    ],
    readTime: 650,
    isApproved: true,
    updatedAt: new Date("01-03-2025").getTime(),
    createdAt: new Date("01-03-2025").getTime(),
  },
];

// Insert data
instance.UserRoles.insertMany(userRoles);
instance.Users.insertMany(users);
instance.PlaceTypes.insertMany(placeTypes);
instance.BlogTypes.insertMany(blogTypes);
instance.BusinessStatuses.insertMany(businessStatuses);
instance.Places.insertMany(places);
instance.Blogs.insertMany(blogs);

// Insert some data for interactions
const userFavoritedPlaces = [
  {
    placeId: places[0]._id,
    userId: users[0]._id,
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
  {
    placeId: places[2]._id,
    userId: users[0]._id,
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
  {
    placeId: places[3]._id,
    userId: users[0]._id,
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
];

const userFavoritedBlogs = [
  {
    blogId: blogs[0]._id,
    userId: users[0]._id,
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
  {
    blogId: blogs[1]._id,
    userId: users[0]._id,
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
];

const placeReviews = [
  {
    placeId: places[0]._id,
    userId: users[0]._id,
    content:
      "Tôi đã đi tới địa điểm này, rất là ok, mọi người cũng nên thử đến đây một lần!!",
    rating: 4,
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
  {
    placeId: places[1]._id,
    userId: users[0]._id,
    content: "Chỗ này khá ổn, nhưng dịch vụ thì chưa được tốt cho lắm :(",
    rating: 3,
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
];

const blogComments = [
  {
    blogId: blogs[0]._id,
    userId: users[0]._id,
    content:
      "Tôi đã đi tới chỗ này rồi, và bài viết này rất chính xác nha. Cảm ơn tác giả đã chia sẻ :D",
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
  {
    blogId: blogs[1]._id,
    userId: users[0]._id,
    content: "Cảm ơn tác giả đã chia sẻ, chúc các bạn đi du lịch vui vẻ!",
    createdAt: new Date("02-13-2025").getTime(),
    updatedAt: new Date("02-13-2025").getTime(),
  },
];

// Insert
instance.PlaceReviews.insertMany(placeReviews);
instance.BlogComments.insertMany(blogComments);
instance.UserFavoritedPlaces.insertMany(userFavoritedPlaces);
instance.UserFavoritedBlogs.insertMany(userFavoritedBlogs);
instance.UserVisitedPlaces.insertMany(userFavoritedPlaces);

console.log("Data inserted successfully");
