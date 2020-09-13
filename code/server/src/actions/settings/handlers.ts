import * as SettingTypes from 'shared/constants/settingTypes';

import { getCategoryList, getTabList } from 'serverSrc/helpers/settings';

const getTabData = (category: string, tab: string) => {
  switch (category) {
    case SettingTypes.CATEGORIES.PROFILE:
      return {
        photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIVFRUVFRUXFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0fHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAEAAMFBgECBwj/xAA7EAACAgECBAQEBAMHBAMAAAABAgADEQQSBSExQQYTUWEHInGBFDJCkaGxwRUWI1Ji0eEzcoLwFyRj/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAJBEAAgICAgMBAAMBAQAAAAAAAAECEQMhEjEEE0FRIjJhcRT/2gAMAwEAAhEDEQA/AOyV0AQTXaflkQ9TFYuRIOKaoRMglmSsfv05BmnlGc9FLGojHvJmPJMxhsLMR3yjMCkzGNAZjMd8qY8ozGMb5rvm/kzHlmYwjZN9808qbCqYxssziZVJuFmMaqmYXRRG0GIQlkrCP6GjY6cQeyjEMVpsRmUcUxSMAmwEItojWJJxowgJibCKFIw8pjgM514i+Kel0lpoCWXOhw+zaFU913MeZ+ktPhLxRRr6vNoJ5HDoww6N1ww6fQjkZRMSnVkxckFMPIgtyQSRrGS013zYrNCJNmtmfMmPNmJqYA2Z3zHm+0wJoxgGHfNmRYIOWiUzGCg4mwIgm6bpMGgpRHBVGE1CjvNrtR8pK4Jwcc+RPbnKJIbixnW6uuvG91Xcdq7iFyfQZ6mZ82ch8a8estrbTcT0n4djk6e9G3oLFHIH2PQ+x6DrLN8L+MvqdEpsJZ62NbE8ydoBUk9ztIgssoaOg03wpXkIlhhtF8dSJygSUZtqirtjoMbsnQJiKEvXFF4gPJnibh1un1NqXKQTY5Vj0sVmJDKehzn951r4F8FuqS/UWKyLd5a1qwwWCbyXwe3z4Hrg+0tnAKHFNa6jD2BRvPX5u/Pv9ZYKTFTE9tqgxTNbFmFMclAICYRsiE3rBWaTkEwZoZuq5hVVEXsyBFoJjg0cPWubgQ8BiO/ACaPoPSSOo1CVqWdlRR1ZiFA+5gtXEN5Hl1uy552MPLQD234ZvbAIPrD60EBagiNXE9pL6peUjbFk2qLY6IyxT1j1Fx6RyxIOy4mTOjtDPHOE1aulqbRlWHI91bsynsRK7w/QDg2htbf5p8wMSRsHzFUAxz6CWquzEF47w4amk17ip3KyMBna6MGU47jI6RjUPcL45p7ywqtSwqFLbDuADdOY5dpIF5RdD4SvW1rG1JqDBQ6aYGsWFc/M27ODg4+XB95GeJPiWdPa9CaZiyHaWsbYDjuowSR7zAcVZ1GrUSQp1AM5BovHesAWy7h7GpsYsobzOR74GQf3E6RpNRkA+ozg8jz9YydE5YywK8UApvij8iLgyPQc4bSYPWsfSTOGIWhjymD1mPKZRMsZtXlIgk79smYOKBuzFmrCKiqEgTA5QHiHD67DusDOAP8Ap7m8s/8AdWDh/wDyyJuh0jFnGqslK91zjkVpG/B9Hf8AIh/7mEes1uysWWrsGQG+YEICcbnboAOWT294KtdpAVAtKDsABgegA/4h1NIC7SS2epJ656/SBSKSgkuyG4fx3Tai/CbHwGFVpRh8ynDIjsMNnG4FDzH7yUGiJObHLf6RyWU63w49YamuqwnaqoylQpKDFVpfOUdQFyfVRgHlm7HIUAnJwMnGMnHM47Tch5VCuD7B9bqFUYzAvMzIXxEHB3AnlBeFcWzyJ5zmWRyezphgvHyWywPGHEcR8xMI4nQIyxytplliCx0x7HwsB4lwWm9St1SWA9mUH9j2MOSFIsIjdFG8L+EbNFqLTXbnTOMrUdxKvkc8nl6jPU5GekuFdeYaKY4tWIRXkGFpmISZiLZFyYwojoE1UQhKSYTiijCR1TMfhzM+SYytFEmbhpqXmBU0z5B9ZOcpvpFEjUvMb45+H94jpR6yXryMYZ3xB4xq8K6pz+ZXKnlglMEr9cc/sZpRWzItinIZQwz1wwyIPXIRya+By2zLNmRq6kg4YYMJSyHnKOmaM1LoA4tp8gzm3GC1D7l6ZnVNWMic48ZphWMRf2PT8PJToP8AD3iJLBjcMyz12Aiebv7Vspt3Icc+k6n4L8ZLcoVjhvSdUsTSsORJt0dAxMhY1VaCMgwuigmIiDddmESF1JNkVVhde1hKRRKWSxgCYJj7af0geqJUdJnaJ9jepuAmJD3XljFELKBKU28pI6O/cOfac/o8V1bggcEntLZwjU5PsRGncWed48nVNE7mLdG1MzGs6TZzM7poTMCBPZhzdEW7zSZBhsxXeJ8Zreyk1hrFSwksikhnZGRaqyfzMdxJxyAU5Ihfhu5sNUw2ivAVGUraqHO0NzKsAOQZTzxJOzTqzIxHNCSvsSpU8voT+8ex3iJO7GsjONU8g4+8D0dsl+IrmtvpIXh1RPQGDItHFJOOZV9DNQ/yznvi5d4IEvHELMDBlW1dG8zlTpnqYJU7OS6vgJJJxAl0dlLB05ETrVvCRjpI4+HfMcLjrOyOc71PG9smfh5rrL6tzgjHL6y9KcCAcH4ctNYVRjAhTNF7Z50n7Jf4OboRpmwYAIXVCtMWcKJMRMoPWYQ8ptLkgK7hiNzxgxQ2Yg4oNs84X8AbR8SCkk1sxKH2/wAp+k6zw63ABHbEqHHdWtrqT2MsnCXyPsJs6uGzgx+V7Zw/5RcKr8jMC49xf8Pp3tC7mGAi5/M7kKgz7sRGKmIED4/oTqNO9QbaxwVb/K6sGQ/ZgJwc2elxGm0GuVPOGtZ7gN3lFE/DseprC43KO27OZNcO40ltFV5IQWhCNxxhmwAn1ycSqnjWvZPJGjZbiNvmF0OnXI/6gYHcR324zJK3wyj6OrRszbU8r5hyYmshuvbOD9Mw8mjNfpZbdYqjLMFGQAScZLHAH1J5SA1F1+r1FtNV7UU0FVZ6wvmWWsocqGYEKqhl7ZJMDu8C6c7SrXKVdHGbrXGUYNgq7EHOMR61L9JfbbXS19N5VmWsr5ldoUIWAYgMrBV78iJnJsySDeEam+rUHSX2ecGrNlNpAVyqsFdLNvIkblOQBkH2lhBlc4Np7rtQdXfX5IWs101EhnAZgzu5HIE7VAA6Y95ZJXHbFkZcAgg943SAowo5TDWA8sxrzMS90JRjinDxavLk3Y+vsZVzpSpwwwRLXXfmZ12lFi/6h0MlPGpbXY6k0VbyhC+HaQZziJqiDgiHaEcpJLYXLQ9ZGgsfcc4gsukUhpDJWOVTYrMJC0F7QdQ/KPZglR6x1WlEznY9mKN7ooQHnfXashh9Z0Two+VB9hOXa4/MJ07wSv8AhgxvJf8AA83xsHGUWWkrMqszmY3zymeuOqsfWDJZNvPmujBSmOqYzp0LewhXJZbHBy2+gNmw5Qa6/HXMxbd78pVfEnizT6UhLLWNjY21Ipew5OF5DoCeQzjJl7pUhUrLFZqIy1ncyr8K8Xae92qVito61WLscY68j1x39JNiz0PKIx+IctuOhh2l1Ugw0eqtgUqNxJniGkDjcOv84JohyhvD78jEzZQAcjof5yko3/JE2METJEyRExhiVRqYqxNwuYn5coWFv4Ns+DGr+JJW1aO3zWsVQYJywUsenTkp5zSzrK34l4dezHUUOPMq09y0J/8AtYBh8nl0GB9ZO2JVl0V4p5cp8Ua+i1j+K1C25IZbHYnPcGt8gH7copS2H1h2vfHOdI8E8URqRgjI6icx1vznaIbwsvVzUkSueHKNFcHjckdq/Ee8wdROd6TxPYOTDMPr8UqeoxPPliki78Sa+F0Go7CTGh0WPmfr6f7wDw5pcoLWHNhlQew9TJi27H/EbHiXcjjm6dIdeyDWXfSD3XwXzucs5CJGvFNbtXI7n+k4E3EGt1Vo2INQ+rQpc7MGQrZtVRhSoQBVznsO/bvGtrLjB+xnK/FngQ22myshHb8wIyjHpkY5g/vNFo6IRTjrsg/EnHrGvJsKC7TOvknT/kzuBcMX+Z+ij5cdGnZ6j8onMvDXgEU6is6iwOy5da61JQbCMNYxxyyRgYGSPYzpiiCTXwUcB7zcNiNjEQPrEMH8O1BBliUhh9ZUKWwZYeGajIxKY5VoSa+m7dcTIE14n8o3jt1glOuB7wt8XRO6C9TqFRSzsqqO7EAD7mQn959MzBa3NpJx/hI9oHPuyAqB9TJK7a42sAw9GAI/Yzh/xZ4lrE1hQvZXRhfJCMyIw2jccrgM2c8u3KC3Jjx2ducys/2lqLb7q6VqVaGVD5m8s7FA+QFxtXDAZ5558pTvg7x7V222U2M9tKpu3uSxR8qAm88zkEnB6bZ006CvzfOC4crtLDIyoOQGHQ47Z6ZPrA0boG0dZYBra1WzocEOPs2AcfYRQ4rFAazhXDtH+o9ZIijEfppK8j2hIqnTOVnr4lRHfho02n5yYFMZsrkWztjI6bwbiotoRl5fLgj0I5ETay6UbwnxTyrPLY/I+Megbsfv0/aXKwRGeH5GH1za+GWsmhsms1gI0PJZGbBzmQe82f17TBIbVk03+cQxR0VGKgtsKMzKSoGdp3nJ7YH1i1HiGhK3tdsVoMl9rbck4CqcfM3sMyX2Tl/xc1Dlalx8gsfPX8wXC5+2+GKtjJWiTq+JtTMcae/YMkuApwq4yxUHkBuHfuJdOHayu+tba2DowyCP/eR7YnGOCppVbTsfPKFHOrJQ+WRyXbyALVBs7uZHyzo3w7Rd2sFLBqBqM1lc7QWQM6rnsMqPc5PeNKKQC3VpDtIcGNrXiFpXEoRsk1IdSD3GDKNrtM9DnaT95cKGIgXH6AwDevIzZtxsnRTv72hDizlJKrjGn1Aw2xwezAMP2Mr3G+DBieUp+t4HbWd1bEfSUxY1JdnO81Omdl0RqRdtaqi+igKP2EKFoM4dpfFGroOHywEn9D8RFP5wRGlhkisZcjqW6KUSjx7QetgH1iicJfg+w7xpwfy7PNUfK/X2b/mV1DOt8S0i2oyMMgicW8Q0Waa41v06q3Zh/vG/w9fwJrIuLeyQaMWGQh4ifWIcU9ZqPU9QVq3xLj4Q8RC9fJsP+Ko5Z/Wo/qJz3U6ndI38W9TixCVZTkEdiI3G0c3k4VONM7qRFtkV4T44usoFg5MPlsUfpcenseok1tkGqdHhtU6Y2BNgO03VI4tcwLGUSQ3iPw8moRlZcq3UDqCOjKexljVI4qQoMZuLs5Vwf4aOGsCauxK3XY4CDeyHOULZx6c9s6TwPg1emqWmpcKvqcsxPNmZu7E8yZIqsdURuxJzt6NVSOhZjdiV7jXi2mlvLU77PQdB9TN0TckifvvVBljIjUa4ufbsJXzxFrDuYyR0pnNObloyZIjRLYMd5G67gLemRJahsSSo1GeRj450CcFI5rxDw/nOV/hKrxPw11IE7xZpUbsJG6vgCN2nXHIQ9co7R5w1/BGB5RTtHFfBQb8sUr7Cy8hpbRfXaVrxZwVNQo3DmpyD3lgJgeqOZyyZeEnF2jn7+Fah+mC3cAqH6RLprAJB6qJbO2GbI/pXLuCVY5Lj6Stca4MVBKc/aXuwSO1lXKPGTTLrJL9KV4H8QnSaj5s7GOLF9vXHqJ3rT2K6q6EFWAII6EGcB8Q8NAO9Rg95afhh41Wr/wCrqGwhP+E56KT+knsD2nRkx848kedmf8zrarNgszuEYtvA6zlJD4ia4Su8U8QrWDzlQ1fjCx220qXPsM/ue0pGDfQGdObWqOpEjtX4lqTluyfQczOf16LW387XKKf0p1+5k9wrgiJ+nn6nmf3jcK7ZCeT8Dr+I3ajkuUT2/MfvCeGeHKQdxrBY9SeZP3MkdFosYkxTRiaiKi27YAeCVH9OD7coxZwgrzQ59j1lgVI0b03+Xkb9u/b325xn94kscWWSohKX7HkYWhhWr0gbn39ZHK5BweonPKHErF2G12kQmvWesjw01d4E2uhiZW5TFIFtRiKN7WHiSdrSPtsyT7R3U2HoOpnP/Fd9w1tNJssSkqCUqYVveSLS+23II2FK8rkcmJznAlK5MeKLRrWkU6wPwxq7LRfuFnlpcVpNuC5VVG/J57gH3ANk+meUkDYhBO5cAkE5GAQcEE+ueUDVMvB6A7a+UA1acpjxfxF9PSHQdbK0Lbd2xXbBfb+o+g9SJXKeIXDUire1tTDrZX5dittZjyCL8mABkjq3LODKRi2rKLIk6NeLV8jKJqeTEToHGBjM51xc4edeEj5CTOm+AviGEUafVscDlXafTsr/AND+8sHHvEJPKr5iemOeZyPwxwOzVvgAhB+Z8cvoPUzrPB+EpQgRBnHc8z94uSEE7OGc+JFaXw+1x36lzj/IDj9zLlwjS6eoBVRVH0EYTQk8ySIrNKw6HMk8sXqyTWR7otVFKEcgI62hU9pBcM1pU4aWjTsCMiAEd9jdFGOULVZkLNgI1FUqFicp+JvFtXog91Z8t9Td5a2DBKUU15VVzyDMzWN9Mzp+v1iUobLGCqvUn+AA7k9AB1lX1JOscafW6ZPIvR3qRs+ahqK/NYQflZg+RjmuMZ5xZUPH9Kd8IvF+q1F76bUObl8s2K7Y3IVZVKkgcwd3f0950XilX6h26zXw/wCGdLogw01QTdjc2WZmx0BZiTj2hmsXII9os43GgSkrtESt01e6Am7nia2XzjLId1GoxFITXao5wP4RRlFjUX1Ksc+5kTxDg1VmdwJycnn3+8m4zcktQIzcXpldr4etedufuSf4SJv4Gh3DfaFbdlA524ckuNpB6knn1GeREtV9MjrqSIOivPl2RWv4cLE2EkDGMDoR6EHrIj+wErJZSQxxlsDcQOgJ7iWRoxeuRCmVWRpUUjjtPL6Si6ThR1OqWkHA6sfRR1/2+86Nx9flMA8HcNC77z1c7R7KPT6n+U7MTpHP5GSo2Wjh+jStFqqUKoGBiTen0wA94Hw1O8lVnF5GV3SOXBjv+TEomdsyJkTlTOqjRqAYfwvUlDtboekHSO7ZbHkaZHJC9rsndRWXQqrshPR12lh9NwI/hOOca+IC6TWutVLXml2Rrb77GZmXKv5aj5EGcjO2dc4ZfkYPUSjeJ/hNVqtQ2orvNPmNusTYHBY/mZDuG3PXnnmftOtq9i42vpYawOIVabW0PsIBZEtTzKwx+Vtygj51IIDA+sP0PC3Ww332Cy3aUXauyutCQWCLknJIGSSTyEK4LwuvTUV6eoEJWu0Z5k9ySfUkk/eFMZuP1gbGngepflCL3kDxXW7QecJGciC1lwDt9TBg72NtQEk9o9w/hNuobIGFz+Y/09ZdeE8HSlflHPux6mc8cds6k6QBwHw+Kvnsw1h/YewikxqtclY5kRS1JGps1yI3ZYIPrdHbjKEH+EgtVqL0/MhH2P8AOJxZaGLn0yddhBrMSBXijE4PKJuJAHGYOLK/+eSJS3TgwO3TETNOrB6GOfiIKJtNaZUfFFHyExvhp21qo7ASw8Z0y21svqD+8qOmuxlT1HL9p04do5PJdpIt3DLPlhwsld4VrOozJRbpwZ4tTZbDuCJFbI4ryOW6OC+RorRJVtCq+ch01UIp1gjIRkzoDh+slwZXuFXBnPtJ4T0If1RyJ7ZvujVrcpviaso7xxqbI7UBm5KMxqngKk7rTu/09vv6wnV8WqrHNhK9rvFhPy1DPvFsMcFuy0WXJWvYASB4h4iJO2oZMhVqtuObGIHpDQ1dK8hz/jJuR0KCX+j2m4a1h33t/wCMUG0GqaxiSeQ7RRbA2yl8G+K1i4Fq595dOG/ETS28mO0n1nngGOI5E7XjiWcIv4emlv0d3+Q/sD/CNXeG9O/NWI+hz/OeddPxOxPyuR95NaPxlqU6WGJ6mMlOP9ZHZv7plTlLf3Ey/h+31Uzmek+JOoXqcyY03xSf9SRHjkLL2S72WqzgmoHRc/eVfU+F9WXYikjny5rgg/eSFHxQQ9VMLr+JdJ7GGKlF6RGeKUltENV4d1inIpP8P95M6fg+pI51kH6iPL8SKPQzP/yPT6GLkjz7QIYpw6HE4Ff/AJcfcQhPDlx6lR95Hv8AEivsDBrfiQOyyXoX4VrJ+Fiq8MN+qwfYQ2rw/Uv5mJ++JQr/AIhWn8oxI+/xje36sfSMsKXwHrm+zrFFdFOcYH35xjVeI6E/WJyC3jNr9XY/eNrcT1zKUzLAkdI1njdeiDMg9X4jus74ErNbyS0yd4rHUIrpBKKWOWJMkNOVT0kabcdIq2yYj2F7LCNZy5cpGaq0mPNyUQRPmYD3ipCrRL6YbKR6sf4RQiurfYEHRR/SKaidnnMHnHQIyY8pnol0KLMUwTMYdQxyNVRywwBHEMdBjNJj+JgmwJ9ZuGMbEWYAhKH3jqj3mumWEERQmqmPVn2g5Mf0nMwMxIU1GOtymwPKMu0mKO0HnJuvoJCaPm0ms8oshWJjHeHrloJbbD+GcucV9AYZrLMcouDplt3pzgepsyZIaD5az6mJ8FfRP8CXJZ4o7oCEqAPU84oLIPbPMJjyRRT0TpRkzWKKYI5VHbIopgro308IEUUDGFNczMUxg7SQhooohhiyE8P6zMUz6MSbwdzFFJoAXw780lHMUUSXYGMN1kvpfyxRRZCvoGsPOTVH5U+0UUV9CSDt5J5mYiiiEz//2Q==',
        name: 'test test',
        email: 'test@test.com',
      };
    case SettingTypes.CATEGORIES.GROUPS:
      return {};
    default:
      return {};
  }
};

export const handleSettingsDataFetch = (category: string, tab: string, res: any): void => {
  const { categories, messages: categoryMessages } = getCategoryList();
  const { tabs, messages: tabMessages } = getTabList(category);
  res.status(200).send({
    categories,
    tabs,
    data: getTabData(category, tab),
    messages: {
      ...categoryMessages,
      ...tabMessages,
    },
  });
};
