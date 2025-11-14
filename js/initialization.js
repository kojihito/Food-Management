/* 

Reload local storage() {
    localStorage.clear();
    location.reload();
} 

*/

// 1. Khởi tạo danh sách sản phẩm
function createProduct() {
    if (localStorage.getItem('products') === null) {
        const products = [
            {
                id: 1,
                status: 1,
                title: 'Nấm đùi gà xào cháy tỏi',
                img: './assets/img/products/nam-dui-ga-chay-toi.jpeg',
                category: 'Món mặn',
                price: 200000,
                costPrice: 100000,
                profitRate: 100,
                quantity: 10,
                desc: 'Một Món chay ngon miệng với nấm đùi gà thái chân hương, xào săn với lửa và thật nhiều tỏi băm, nêm nếm với mắm và nước tương chay, món ngon đưa cơm và rất dễ ăn cả cho người lớn và trẻ nhỏ.'
            },
            {
                id: 2,
                status: 1,
                title: 'Rau xào ngũ sắc',
                img: './assets/img/products/rau-xao-ngu-sac.png',
                category: 'Món mặn',
                price: 180000,
                costPrice: 90000,
                profitRate: 100,
                quantity: 5,
                desc: 'Rau củ quả theo mùa tươi mới xào với nước mắm chay, gia vị để giữ được hương vị ngọt tươi nguyên thủy của rau củ, một món nhiều vitamin và chất khoáng, rất dễ ăn.'
            },
            {
                id: 3,
                status: 1,
                title: 'Bánh lava phô mai nướng',
                img: './assets/img/products/banh_lava_pho_mai_nuong.jpeg',
                category: 'Món mặn',
                price: 180000,
                costPrice: 90000,
                profitRate: 100,
                quantity: 5,
                desc: 'Rau củ quả theo mùa tươi mới xào với nước mắm chay, gia vị để giữ được hương vị ngọt tươi nguyên thủy của rau củ, một món nhiều vitamin và chất khoáng, rất dễ ăn.'
            },
            {
                id: 4,
                status: 1,
                title: 'Set lẩu thái Tomyum',
                img: './assets/img/products/lau_thai.jpg',
                category: 'Món mặn',
                price: 700000,
                costPrice: 350000,
                profitRate: 100,
                quantity: 5,
                price: 699000,
                desc: 'Lẩu Thái là món ăn xuất phát từ món canh chua Tom yum nổi tiếng của Thái Lan. Nước lẩu có hương vị chua chua cay cay đặc trưng. Các món nhúng lẩu gồn thịt bò, hải sản, rau xanh và các loại nấm.'
            },
            {
                id: 5,
                status: 1,
                title: 'Cơm chiên cua',
                img: './assets/img/products/com_chien_cua.png',
                category: 'Món mặn',
                price: 280000,
                costPrice: 140000,
                profitRate: 100,
                quantity: 20,
                desc: 'Cơm nấu từ gạo ST25 dẻo, hạt cơm tơi ngon, thịt cua tươi chắc nịch, bếp đảo cho săn hạt cơm, rồi đổ cua đã xào thơm vào, xúc miếng cơm chiên cua đầy đặn có thêm hành phi giòn rụm, món ngon như vậy đảm bảo tranh nhau đến miếng cuối cùng.'
            },
            {
                id: 6,
                status: 1,
                title: 'Súp bào ngư hải sâm (1 phần)',
                img: './assets/img/products/sup-bao-ngu-hai-sam.jpeg',
                category: 'Món mặn',
                price: 550000,
                costPrice: 275000,
                profitRate: 100,
                quantity: 3,
                price: 540000,
                desc: 'Súp bào ngư Bếp Hoa có bào ngư kết hợp cùng sò điệp, tôm tươi... được hầm trong nhiều giờ với rau củ & nấm đông trùng tạo ra vị ngọt tự nhiên hiếm thấy. Một món ăn khiến cả người ốm cũng thấy ngon miệng đó ạ.'
            },
            {
                id: 7,
                status: 1,
                title: 'Tai cuộn lưỡi',
                category: 'Món mặn',
                img: './assets/img/products/tai-cuon-luoi.jpeg',
                price: 340000,
                costPrice: 170000,
                profitRate: 100,
                quantity: 100,
                desc: 'Tai heo được cuộn bên trong cùng phần thịt lưỡi heo. Phần tai bên ngoài giòn dai, phần thịt lưỡi bên trong vẫn mềm, có độ ngọt tự nhiên của thịt. Tai cuộn lưỡi được chấm với nước mắm và tiêu đen.'
            },
            {
                id: 8,
                status: 1,
                title: 'Xíu mại tôm thịt 10 viên',
                img: './assets/img/products/xiu_mai_tom_thit_10_vien.jpg',
                category: 'Món mặn',
                price: 140000,
                costPrice: 70000,
                profitRate: 100,
                quantity: 11,
                desc: 'Quý khách hấp chín trước khi ăn. Những miếng há cảo, sủi cảo, hoành thánh với phần nhân tôm, sò điệp, hải sản tươi ngon hay nhân thịt heo thơm ngậy chắc chắn sẽ khiến bất kỳ ai thưởng thức đều cảm thấy rất ngon miệng.'
            },
            {
                id: 9,
                status: 1,
                title: 'Trà phô mai kem sữa',
                category: "Nước uống",
                img: './assets/img/products/tra-pho-mai-kem-sua.jpg',
                price: 34000,
                costPrice: 17000,
                profitRate: 100,
                quantity: 2,
                desc: 'Món Nước uống vừa béo ngậy, chua ngọt đủ cả mà vẫn có vị thanh của trà.',
            },
            {
                id: 10,
                status: 1,
                title: 'Trà đào chanh sả',
                category: "Nước uống",
                img: './assets/img/products/tra-dao-chanh-sa.jpg',
                price: 25000,
                costPrice: 12500,
                profitRate: 100,
                quantity: 2,
                desc: 'Trà đào chanh sả có vị đậm ngọt thanh của đào, vị chua chua dịu nhẹ của chanh và hương thơm của sả.',
            },
            {
                id: 11,
                status: 1,
                title: 'Bánh chuối nướng',
                category: 'Món tráng miệng',
                img: './assets/img/products/banh-chuoi-nuong.jpeg',
                price: 60000,
                costPrice: 45000,
                profitRate: 25,
                quantity: 20,
                desc: 'Bánh chuối nướng béo ngậy mùi nước cốt dừa cùng miếng chuối mềm ngon sẽ là Món tráng miệng phù hợp với mọi người.'
            },
            {
                id: 12,
                status: 1,
                title: 'Há cảo sò điệp (10 viên)',
                img: './assets/img/products/ha_cao.jpg',
                category: 'Món mặn',
                price: 140000,
                costPrice: 70000,
                profitRate: 100,
                quantity: 20,
                desc: 'Những miếng há cảo, sủi cảo, hoành thánh với phần nhân tôm, sò điệp, hải sản tươi ngon hay nhân thịt heo thơm ngậy chắc chắn sẽ khiến bất kỳ ai thưởng thức đều cảm thấy rất ngon miệng.'
            },
            {
                id: 13,
                status: 1,
                title: 'Chả rươi (100gr)',
                img: './assets/img/products/thit_nuong.jpg',
                category: 'Món mặn',
                price: 60000,
                costPrice: 45000,
                profitRate: 25,
                quantity: 20,
                desc: 'Chả rươi luôn mang đến hương vị khác biệt và "gây thương nhớ" hơn hẳn so với các loại chả khác. Rươi béo càng ăn càng thấy ngậy. Thịt thơm quyện mùi thì là và vỏ quýt rất đặc sắc. Chắc chắn sẽ là một món ăn rất hao cơm'
            },
            {
                id: 14,
                status: 1,
                title: 'Nộm gà Hội An (1 phần)',
                img: './assets/img/products/nom_ga_hoi_an.png',
                category: 'Món mặn',
                price: 60000,
                costPrice: 30000,
                profitRate: 100,
                quantity: 10,
                desc: 'Nộm gà làm từ thịt gà ri thả đồi. Thịt gà ngọt, săn được nêm nếm vừa miệng, bóp thấu với các loại rau tạo thành món nộm thơm ngon, đậm đà, giải ngán hiệu quả.'
            },
            {
                id: 15,
                status: 1,
                title: 'Set bún cá (1 set 5 bát)',
                img: './assets/img/products/set_bun_ca.jpg',
                category: 'Món mặn',
                price: 60000,
                costPrice: 45000,
                profitRate: 25,
                quantity: 20,
                desc: 'Bún cá được làm đặc biệt hơn với cá trắm lọc xương và chiên giòn, miếng cá nhúng vào nước dùng ăn vẫn giòn dai, thơm ngon vô cùng.'
            },
            {
                id: 16,
                status: 1,
                title: 'Bún cá (1 phần)',
                img: './assets/img/products/set_bun_ca.jpg',
                category: 'Món mặn',
                price: 60000,
                costPrice: 45000,
                profitRate: 25,
                quantity: 11,
                desc: 'Bún cá được làm đặc biệt hơn với cá trắm lọc xương và chiên giòn, miếng cá nhúng vào nước dùng ăn vẫn giòn dai, thơm ngon vô cùng'
            },
            {
                id: 17,
                status: 1,
                title: 'Xôi trắng hành phi (1 phần)',
                img: './assets/img/products/bun_ca_hanh_phi.jpeg',
                category: 'Món mặn',
                price: 60000,
                costPrice: 45000,
                profitRate: 25,
                quantity: 9,
                desc: 'Bún cá được làm đặc biệt hơn với cá trắm lọc xương và chiên giòn, miếng cá nhúng vào nước dùng ăn vẫn giòn dai, thơm ngon vô cùng'
            },
            {
                id: 18,
                status: 1,
                title: 'Tôm sú lột rang thịt (1 phần)',
                img: './assets/img/products/tom_su_luot_ran_thit.png',
                category: 'Món mặn',
                price: 60000,
                costPrice: 45000,
                profitRate: 25,
                quantity: 20,
                desc: 'Tôm sú tươi rim với thịt. rim kỹ, vừa lửa nên thịt và tôm săn lại, ngấm vị, càng ăn càng thấy ngon.'
            },
            {
                id: 19,
                status: 1,
                title: 'Bánh cookie dừa',
                img: './assets/img/products/banh_cookie_dua.jpeg',
                category: 'Món mặn',
                price: 130000,
                costPrice: 65000,
                profitRate: 100,
                quantity: 20,
                desc: 'Bánh cookie dừa ngọt vừa miệng, dừa bào tươi nhào bánh nướng giòn tan, cắn vào thơm lừng, giòn rụm'
            },
            {
                id: 20,
                status: 1,
                title: 'Cá chiên giòn sốt mắm Thái',
                img: './assets/img/products/sot_mam_thai.jpeg',
                category: 'Món mặn',
                price: 130000,
                costPrice: 65000,
                profitRate: 100,
                quantity: 20,
                desc: 'Bánh cookie dừa ngọt vừa miệng, dừa bào tươi nhào bánh nướng giòn tan, cắn vào thơm lừng, giòn rụm'
            },
            {
                id: 21,
                status: 1,
                title: 'Tôm sú rang muối (1 suất)',
                category: 'Món mặn',
                img: './assets/img/products/tom-su-rang-muoi.jpeg',
                price: 550000,
                costPrice: 275000,
                profitRate: 100,
                quantity: 20,
                desc: 'Từng chú tôm sú được chọn lựa kĩ càng mỗi ngày, đảm bảo là tôm tươi sống, vẫn còn đang bơi khỏe. Tôm rang muối vừa đậm đà lại vẫn giữ được vị ngọt tự nhiên của tôm sú.'
            },
            {
                id: 22,
                status: 1,
                title: 'Tôm sú rang bơ tỏi (1 suất)',
                category: 'Món mặn',
                img: './assets/img/products/tom-su-rang-bo-toi.jpeg',
                price: 550000,
                costPrice: 275000,
                profitRate: 100,
                quantity: 20,
                desc: 'Tôm được chiên vàng giòn bên ngoài, bên trong thịt tôm vẫn mềm, kết hợp cùng sốt bơ tỏi thơm nức . Tôm tươi được Bếp Hoa chiên theo bí quyết riêng nên phần thịt tôm bên trong sẽ có hương vị thơm ngon đặc biệt, sốt bơ tỏi béo ngậy hấp dẫn. Ăn kèm bánh mỳ rất hợp'
            },
            {
                id: 23,
                status: 1,
                title: 'Combo Vịt quay và gỏi vịt',
                category: 'Món mặn',
                img: './assets/img/products/combo-vitquay-va-goivit.jpeg',
                price: 510000,
                costPrice: 255000,
                profitRate: 100,
                quantity: 7,
                desc: 'Combo vịt quay Bếp Hoa + gỏi vịt bắp cải size đại cực kỳ thích hợp cho những bữa ăn cần nhiều rau, nhiều đạm mà vẫn đảm bảo ngon miệng. Vịt quay chuẩn Macao giòn da thấm thịt, thêm phần gỏi vịt chua chua ngọt ngọt, rau tươi giòn ăn chống ngán, cân bằng dinh dưỡng.'
            },
            {
                id: 24,
                status: 1,
                title: 'Set cá cơm tầm',
                img: './assets/img/products/set_ca_tam.jpg',
                category: 'Món mặn',
                price: 950000,
                costPrice: 475000,
                profitRate: 100,
                quantity: 20,
                desc: 'Một 1 set với 3 món ngon mỹ mãn đủ 4 người ăn no, bếp trưởng tự tay chọn từng con cá tầm tươi đủ chất lượng để chế biến đủ 3 món gỏi, nướng, canh chua 10 điểm cho chất lượng.'
            },
            {
                id: 25,
                status: 1,
                title: 'Chả ốc 1 phần',
                img: './assets/img/products/cha_oc_1_phan.jpeg',
                category: 'Món mặn',
                price: 350000,
                costPrice: 175000,
                profitRate: 100,
                quantity: 20,
                desc: 'Chả ốc với ốc giòn tan, băm rối, trộn với thịt, lá lốt, rau thơm, nêm nếm vừa ăn và viên tròn, chiên cho giòn ngoài mềm trong. Ăn chả ốc kẹp với rau sống và chấm mắm chua ngọt cực kỳ đưa vị.'
            },
            {
                id: 26,
                status: 1,
                title: 'Gà ủ muối thảo mộc (1 con)',
                category: 'Món mặn',
                img: './assets/img/products/ga-u-muoi-thao-moc.png',
                price: 450000,
                costPrice: 225000,
                profitRate: 100,
                quantity: 20,
                desc: 'Gà ủ muối tuyển chọn từ gà ri tươi, ủ muối chín tới với gia vị thảo mộc tự nhiên, da gà mỏng, thịt chắc ngọt.'
            },
            {
                id: 27,
                status: 1,
                title: 'Gà không lối thoát (1 con)',
                category: 'Món mặn',
                img: './assets/img/products/ga-khong-loi-thoat.png',
                price: 520000,
                costPrice: 260000,
                profitRate: 100,
                quantity: 20,
                desc: 'Gà mái ghẹ size 1.4kg sơ chế sạch sẽ, tẩm ướp gia vị đậm đà, bọc vào trong xôi dẻo từ nếp cái hoa vàng, chiên cho giòn mặt ngoài. Khi ăn cắt phần xôi là gà thơm ngon nghi ngút khói, thịt gà ngấm mềm thơm, miếng xôi ngọt tự nhiên từ thịt gà ăn cực kỳ hấp dẫn.'
            },
            {
                id: 28,
                status: 1,
                title: 'Cá chiên giòn mắm Thái (1 con)',
                category: 'Món mặn',
                img: './assets/img/products/ca-chien-gion-mam-thai.jpeg',
                price: 350000,
                costPrice: 175000,
                profitRate: 100,
                quantity: 20,
                desc: 'Cá tươi bếp làm sạch, lạng đôi, ướp cho ngấm và chiên vàng giòn. Thịt cá bên trong óng ánh nước, mềm ngọt, bên ngoài giòn tan hấp dẫn. Thêm sốt mắm Thái đầu bếp làm công thức riêng, vị mắm chua ngọt cay the cực kỳ hợp với cá giòn nóng hổi.'
            },
            {
                id: 29,
                status: 1,
                title: 'Chân giò chiên giòn mắm Thái',
                category: 'Món mặn',
                img: './assets/img/products/chan-gio-chien-gion-mam-thai.jpeg',
                price: 420000,
                costPrice: 210000,
                profitRate: 100,
                quantity: 20,
                desc: 'Chân giò lợn đen chọn loại ngon, tỉ lệ nạc mỡ đều đặn, bếp xâm bì cẩn thận và ướp thật ngon, chiên vàng giòn nổi bóng, khi ăn chấm mắm chua ngọt cay cay cực kỳ ngon miệng.'
            },
            {
                id: 30,
                status: 1,
                title: 'Chả cốm (500gr)',
                category: 'Món mặn',
                img: './assets/img/products/cha-com.png',
                price: 180000,
                costPrice: 90000,
                profitRate: 100,
                quantity: 20,
                price: 175000,
                desc: 'Cốm mộc làng Vòng hạt dẹt dẻo và thơm đặc biệt, thịt lợn tươi phải chọn phần thịt vai xay vừa mềm lại không bở, trộn đều với cốm, nêm với mắm ngon, gia vị đơn giản và quật hỗn hợp thịt xay và cốm đến khi nào thật chắc và dẻo. Viên mỗi bánh chả phải đều tay, hấp sơ qua cho thành hình, khi ăn mới chiên vàng. Chả cốm khi cắn vào phải giòn và lại thật mềm, tứa nước trong miệng. Cốm dẻo dẻo cuộn trong thịt thơm ngon lạ kỳ.'
            },
            {
                id: 31,
                status: 1,
                title: 'Vịt om sấu (1 hộp)',
                category: 'Món mặn',
                img: './assets/img/products/vit-om-sau.jpeg',
                price: 350000,
                costPrice: 175000,
                profitRate: 100,
                quantity: 20,
                desc: '[Mỗi phần có 1,2kg thịt vịt]. Vịt om sấu với thịt vịt mềm thơm, nấu với trái sấu, sả cây, ớt tươi cho ra phần nước om chua thanh và rất thơm. Dùng vịt om sấu với rau mùi tàu, rau thơm và bún rất ngon.'
            },
            {
                id: 32,
                status: 1,
                title: 'Giò xào (1kg)',
                category: 'Món mặn',
                img: './assets/img/products/gio-xao.jpeg',
                price: 460000,
                costPrice: 230000,
                profitRate: 100,
                quantity: 20,
                desc: 'Giò xào Bếp Hoa đặc biệt được xào khô, ép chặt để tạo độ giòn. Nguyên liệu chính được làm từ tai và lưỡi heo. Khi ăn giò xào, bạn sẽ cảm nhận từng miếng giò vừa giòn vừa thơm lừng mùi tiêu đen và nước mắm.'
            },
            {
                id: 33,
                status: 1,
                title: 'Nem tai (1 hộp)',
                category: 'Món mặn',
                img: './assets/img/products/nem-tai.jpeg',
                price: 200000,
                costPrice: 150000,
                profitRate: 25,
                quantity: 20,
                desc: 'Nem tai giòn sần sật, trộn với thính gạo rang thơm, ăn kèm lá sung bùi bùi, chấm tương ớt hoặc nước chấm đặc điệt, công thức chỉ riêng Bếp Hoa có.'
            },
            {
                id: 34,
                status: 1,
                title: 'Canh dưa bò hầm (1 hộp)',
                category: 'Món mặn',
                img: './assets/img/products/canh-dua-bo-ham.jpeg',
                price: 270000,
                costPrice: 135000,
                profitRate: 100,
                quantity: 20,
                desc: 'Canh dưa chua hầm nhừ với thịt nạm bò và gân bò. Thơm - ngon - ngọt - béo - chua dịu thanh thanh'
            },
            {
                id: 35,
                status: 1,
                title: 'Nạc nọng heo nướng kèm xôi trắng (500gr)',
                category: 'Món mặn',
                img: './assets/img/products/nac-nong-heo-nuong-kem-xoi-trang.jpeg',
                price: 300000,
                costPrice: 150000,
                profitRate: 100,
                quantity: 20,
                desc: 'Nọng heo - phần thịt ngon nhất trên thủ heo, với những dải thịt nạc mỡ đan xen, mỗi thủ chỉ có được 1-2kg thịt nọng ngon mềm như vậy. Bếp trưởng Bếp Hoa tẩm ướp thật ngấm gia vị, nướng thẳng trên than hoa thơm nức, xém cạnh đẹp mắt. Miếng thịt nướng xong gắp khỏi vỉ vẫn thấy mỡ thơm còn sôi trên dải thịt, để thịt nghỉ vài phút khi thái ra óng ánh nước, gắp miếng thịt chấm với nước sốt siêu ngon độc quyền của Bếp, ngon đến tứa nước miếng, tranh nhau gắp sạch đĩa'
            },
            {
                id: 36,
                status: 1,
                title: 'Thịt quay (400gr)',
                category: 'Món mặn',
                img: './assets/img/products/thit-quay.jpeg',
                price: 280000,
                costPrice: 140000,
                profitRate: 100,
                quantity: 20,
                desc: 'Thịt lợn quay thơm mùi lá mắc mật. Ngoài bì giòn rụm, thịt bên trong mềm, hương vị đậm đà. Đặc biệt, bếp có loại sốt chấm thịt được pha bằng công thức riêng biệt chỉ Bếp Hoa mới có.Hướng dẫn sử dụng: Sử dụng ngay trong ngày. Bảo quản trong tủ mát.'
            },
            {
                id: 37,
                status: 1,
                title: 'Khâu nhục',
                category: 'Món mặn',
                img: './assets/img/products/khau-nhuc.jpeg',
                price: 280000,
                costPrice: 140000,
                profitRate: 100,
                quantity: 20,
                desc: 'Khâu nhục - món ăn cầu kỳ mang phong vị phương Bắc. Làm từ thịt lợn ta, khâu khục được hấp cách thủy trong 6 tiếng cùng với rất nhiều loại gia vị. Thịt mềm nhừ, ngọt vị, phần bì trong và dẻo quẹo. Mỡ ngậy ngậy tan chảy ngay khi vừa đưa lên miệng. Hướng dẫn bảo quản: Hâm nóng lại bằng nồi hấp cách thủy hoặc lò vi sóng. Bảo quản trong tủ mát từ 3-5 ngày.'
            },
            {
                id: 38,
                status: 1,
                title: 'Xíu mại tôm thịt ( 10 viên)',
                category: 'Món mặn',
                img: './assets/img/products/ha_cao_tom_thit.jpg',
                price: 140000,
                costPrice: 70000,
                profitRate: 100,
                quantity: 20,
                desc: 'Những miếng há cảo, sủi cảo, hoành thánh với phần nhân tôm, sò điệp, hải sản tươi ngon hay nhân thịt heo thơm ngậy chắc chắn sẽ khiến bất kỳ ai thưởng thức đều cảm thấy rất ngon miệng.'
            },
            {
                id: 39,
                status: 1,
                title: 'Chè hương cốm lá dứa',
                category: 'Món tráng miệng',
                img: './assets/img/products/che-com-la-dua.jpeg',
                price: 60000,
                costPrice: 45000,
                profitRate: 25,
                quantity: 20,
                desc: 'Chè cốm hương lá dứa dẻo thơm, ngọt dịu, từng hạt cốm thoảng thoảng đâu đó hương lá dứa mát lành'
            },
            {
                id: 40,
                status: 1,
                title: 'Bánh bông lan chanh dây',
                category: 'Món tráng miệng',
                img: './assets/img/products/banh-bong-lan-chanh-day.jpeg',
                price: 50000,
                costPrice: 25000,
                profitRate: 100,
                quantity: 20,
                desc: 'Bánh bông lan chanh dây với vị chua nhẹ, không bị ngọt gắt hẳn sẽ là sự lựa chọn hoàn hảo'
            },
            {
                id: 41,
                status: 1,
                title: 'Chè bưởi',
                category: 'Món tráng miệng',
                img: './assets/img/products/che-buoi.jpeg',
                price: 50000,
                costPrice: 25000,
                profitRate: 100,
                quantity: 20,
                desc: 'Chè bưởi rất dễ ăn bởi hương vị ngọt mát, thơm ngon, vị bùi bùi của đậu xanh, giòn sần sật của cùi bưởi mà không hề bị đắng'
            },
            {
                id: 42,
                status: 1,
                title: 'Set lẩu Thái tomyum',
                category: "Món lẩu",
                img: './assets/img/products/lau-thai-tomyum.jpeg',
                price: 800000,
                costPrice: 600000,
                profitRate: 25,
                quantity: 20,
                price: 699000,
                desc: 'Lẩu Thái là món ăn xuất phát từ món canh chua Tom yum nổi tiếng của Thái Lan. Nước lẩu có hương vị chua chua cay cay đặc trưng. Các món nhúng lẩu gồn thịt bò, hải sản, rau xanh và các loại nấm.',
            },
            {
                id: 43,
                status: 1,
                title: 'Set lẩu Thái nấm chay',
                category: "Món lẩu",
                img: './assets/img/products/lau-thai-nam-chay.png',
                price: 550000,
                costPrice: 275000,
                profitRate: 100,
                quantity: 20,
                desc: 'Một set lẩu Thái nấm chay với nước dùng 100% từ rau củ quả tự nhiên, thêm sả cây tươi, riềng miếng, ớt, nước dừa để lên được vị nước lẩu Thái chuẩn vị. Đồ nhúng đa dạng với nhiều loại nấm khác nhau, rau tươi giòn, đậu phụ mềm xốp, váng đậu amla chiên giòn. Kèm bún tươi ăn rất hợp.',
            },
            {
                id: 44,
                status: 1,
                title: 'Đậu hũ xào nấm chay',
                category: "Món chay",
                img: './assets/img/products/dau-hu-xao-nam-chay.png',
                price: 220000,
                costPrice: 110000,
                profitRate: 100,
                quantity: 20,
                desc: 'Món xào thanh nhẹ ngọt lịm từ rau củ và nấm tươi, thêm chút đậu phụ chiên thái miếng, nêm nếm đậm đà. Ăn kèm cơm trắng hay làm bún trộn rau củ cũng rất hợp.',
            },
            {
                id: 45,
                status: 1,
                title: 'Bún trộn chay (1 suất)',
                category: "Món chay",
                img: './assets/img/products/bun-tron-chay.png',
                price: 80000,
                costPrice: 60000,
                profitRate: 25,
                quantity: 20,
                price: 75000,
                desc: 'Bún trộn chay tưởng là quen mà ăn ngon lạ miệng. Với bún tươi được trộn với nước tương và sốt ớt đặc biệt, mắm chay thơm, thêm rau củ tươi, rau thơm bắt vị, nấm xào săn, đậu phụ thái lát, một món thanh nhẹ thích hợp ăn trưa hoặc để dành cho anh chị eat-clean bữa tối.',
            },
            {
                id: 46,
                status: 1,
                title: 'Bún riêu chay (1 suất)',
                category: "Món chay",
                img: './assets/img/products/bun-rieu-chay.png',
                price: 80000,
                costPrice: 60000,
                profitRate: 25,
                quantity: 20,
                price: 75000,
                desc: 'Bún riêu chay với phần gạch cua chay từ đậu phụ non mềm đánh với sốt màu thơm ngon. Nước dùng thanh nhẹ từ rau củ quả, được nấu lên vị đậm đà rất ngon miệng. Một phần bún riêu kèm với gạch cua là giò chay, đậu phụ rán, rau sống ngọt giòn và tương ớt chay sánh ngon.',
            },
            {
                id: 47,
                status: 1,
                title: 'Miến xào rau củ chay',
                category: "Món chay",
                img: './assets/img/products/mien-xao-rau-cu-chay.png',
                price: 170000,
                costPrice: 85000,
                profitRate: 100,
                quantity: 20,
                desc: 'Sợi miến khoai lang bếp ngâm cho mềm, xào kèm rau củ quả tươi theo mùa, nêm cùng nước tương và dầu mè, một món xào chay vừa mát lành lại thơm ngon.'
            },
            {
                id: 48,
                status: 1,
                title: 'Cuốn nấm chay (10 cuốn)',
                category: "Món chay",
                img: './assets/img/products/cuon-nam-chay.png',
                price: 120000,
                costPrice: 60000,
                profitRate: 100,
                quantity: 20,
                desc: 'Nấm tươi làm chín cuộn với bánh phở và rau bào, thêm đậu phụ chiên giòn thái chân hương đưa vị, chấm mắm chua ngọt chay bếp trưởng pha chế, một món ngon làm món khai vị rất hợp.'
            },
            {
                id: 49,
                status: 1,
                title: 'Xôi xéo',
                category: "Món chay",
                img: './assets/img/products/xoi-xeo.png',
                price: 80000,
                costPrice: 60000,
                profitRate: 25,
                quantity: 20,
                desc: 'Xôi xéo đậu xanh bếp dùng nếp cái hoa vàng hạt mẩy, ngâm với nước nghệ và đồ 2 lần cho hạt nếp chín mềm và thơm, đậu xanh sên mịn cắt tơi trộn cùng xôi, khi ăn rắc hành phi đưa vị, rất hấp dẫn.'
            },
            {
                id: 50,
                status: 1,
                title: 'Chả quế chay',
                category: "Món chay",
                img: './assets/img/products/cha-que-chay.png',
                price: 70000,
                costPrice: 35000,
                profitRate: 100,
                quantity: 33,
                desc: '',
            },
            {
                id: 51,
                status: 1,
                title: 'Nem chay',
                category: "Món chay",
                img: './assets/img/products/nem-chay.png',
                price: 160000,
                costPrice: 80000,
                profitRate: 100,
                quantity: 20,
                desc: 'Nem chay thơm ngon, thanh thuần bếp trưởng sử dụng rau củ bào tươi, đậu xanh, khoai môn, miến, mộc nhĩ và nấm hương, tất cả xào thơm cho lên vị, sau đó cuộn với bánh đa nem mỏng, chiên giòn vỏ, chấm mắm chua ngọt chay ăn kèm rau thơm rất hấp dẫn.',
            },
            {
                id: 52,
                status: 1,
                title: 'Bánh tráng trộn',
                category: "Món ăn vặt",
                img: './assets/img/products/banh-trang-tron.jpg',
                price: 20000,
                costPrice: 15000,
                profitRate: 25,
                quantity: 20,
                desc: 'Bánh tráng trộn là món ăn ngon không chỉ nổi danh đất Sài Thành mà ngay khi xuất hiện tại Hà Nội, nó cũng đã trở thành món ăn “hot trend” rất được giới trẻ yêu thích. ',
            },
            {
                id: 53,
                status: 1,
                title: 'Bánh tráng nướng',
                category: "Món ăn vặt",
                img: './assets/img/products/banh-trang-nuong.jpg',
                price: 10000,
                costPrice: 5000,
                profitRate: 100,
                quantity: 20,
                desc: 'Khác với món bánh tráng trộn, bánh tráng nướng được phết một lớp trứng chút lên bề mặt bánh tráng cùng thịt băm, mỡ hành, nướng đến khi có màu vàng ruộm. ',
            },
            {
                id: 54,
                status: 1,
                title: 'Ốc thập cẩm (1 suất)',
                category: "Món ăn vặt",
                img: './assets/img/products/oc-thap-cam.jpg',
                price: 50000,
                costPrice: 25000,
                profitRate: 100,
                quantity: 27,
                desc: 'Được chế biến đủ các món ốc ngon khác nhau, như: ốc hấp, ốc luộc, ốc xào, ốc bỏ lò,.. với đủ các gia vị như tỏi, hành, ớt, tiêu, rau răm,…',
            },
            {
                id: 55,
                status: 1,
                title: 'Cơm cháy chà bông',
                category: "Món ăn vặt",
                img: './assets/img/products/com-chay-cha-bong.jpg',
                price: 60000,
                costPrice: 30000,
                profitRate: 100,
                quantity: 15,
                desc: 'Cơm cháy chà bông có thể bảo quản cả tháng mà ăn vẫn ngon và đóng gói rất tiện.',
            },
            {
                id: 56,
                status: 1,
                title: 'Phá lấu (1 suất)',
                category: "Món ăn vặt",
                img: './assets/img/products/pha-lau.jpg',
                price: 100000,
                costPrice: 50000,
                profitRate: 100,
                quantity: 22,
                price: 99000,
                desc: 'Cứ mỗi lần hỏi “Ăn gì ở Sài Gòn ngon, rẻ ?” là người ta nhớ ngay món phá lấu.',
            },
            {
                id: 57,
                status: 1,
                title: 'Bột chiên (1 suất)',
                category: "Món ăn vặt",
                img: './assets/img/products/bot-chien.jpg',
                price: 50000,
                costPrice: 25000,
                profitRate: 100,
                quantity: 35,
                price: 49000,
                desc: 'Cùng với nước chấm đặc biệt, bột chiên để lại hương vị khó tả cho thực khách sau khi thưởng thức.',
            },
            {
                id: 58,
                status: 1,
                title: 'Gỏi khô bò (1 suất)',
                category: "Món ăn vặt",
                img: './assets/img/products/goi-bo-kho.jpg',
                price: 60000,
                costPrice: 30000,
                profitRate: 100,
                quantity: 30,
                desc: 'Thơm ngon đến từng sợi bò.',
            },
            {
                id: 59,
                status: 1,
                title: 'Hoành thánh tôm (10 viên)',
                img: './assets/img/products/hoanh_thanh.jpg',
                category: 'Món mặn',
                price: 130000,
                costPrice: 65000,
                profitRate: 100,
                quantity: 9,
                desc: 'Những miếng há cảo, sủi cảo, hoành thánh với phần nhân tôm, sò điệp, hải sản tươi ngon hay nhân thịt heo thơm ngậy chắc chắn sẽ khiến bất kỳ ai thưởng thức đều cảm thấy rất ngon miệng.'
            },
            {
                id: 60,
                status: 1,
                title: 'Nước ép dâu tây',
                img: './assets/img/products/nuoc-ep-dau-tay.jpg',
                category: 'Nước uống',
                price: 100000,
                costPrice: 75000,
                profitRate: 25,
                quantity: 10,
                desc: 'Dâu tây ăn nguyên quả ngon ngọt, có cả quả dôn dốt chua, màu đỏ mọng trông cực yêu. Không chỉ ngon miệng mà đồ uống từ dâu tây còn có công dụng bảo vệ sức khỏe, sáng mắt, đẹp da, thon gọn vóc dáng. Làm giảm nguy cơ mắc bệnh về mỡ máu, chống viêm,…'
            }
        ];
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// 2. Tạo tài khoản admin
// 2. Tạo tài khoản admin (có address_detail)
function createAdminAccount() {
    if (localStorage.getItem('accounts') === null) {
        const accounts = [
            {
                fullname: "Nguyễn Hoàng Khương",
                phone: "0123456789",
                password: "123456",
                email: 'hehehe@gmail.com',
                address_detail: { street: "123 Nguyễn Văn Khối", ward: "Phường Thông Tây Hội", city: "Thành phố Hồ Chí Minh" },
                status: 1,
                join: new Date(),
                cart: [],
                userType: 1
            },
            {
                fullname: "admin",
                phone: "0987654321",
                password: "123456",
                email: '',
                address_detail: { street: "123 Phan Văn Trị", ward: "Phường Hạnh Thông", city: "Thành phố Hồ Chí Minh" },
                status: 1,
                join: new Date(),
                cart: [],
                userType: 1
            }
        ];
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}

// Tạo 20 khách hàng mẫu có địa chỉ chi tiết (address_detail)
function createSampleCustomers() {
    let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
    
    // Chỉ tạo 1 lần duy nhất
    if (accounts.some(acc => acc.phone === "0901234561")) {
        return;
    }

    const sampleCustomers = [
        { fullname: "Nguyễn Văn An", phone: "0901234561", password: "123456", email: "vana@example.com", status: 1, join: "2023-01-15", cart: [], userType: 0,
          address_detail: { street: "123 Lê Lợi", ward: "Phường Bến Thành", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Trần Thị Bình", phone: "0901234562", password: "123456", email: "thib@example.com", status: 0, join: "2023-02-20", cart: [], userType: 0,
          address_detail: { street: "45 Nguyễn Huệ", ward: "Phường Bến Nghé", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Lê Văn Cương", phone: "0901234563", password: "123456", email: "vanc@example.com", status: 0, join: "2023-03-05", cart: [], userType: 0,
          address_detail: { street: "78 Trần Hưng Đạo", ward: "Phường Phạm Ngũ Lão", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Phạm Thị Dung", phone: "0901234564", password: "123456", email: "thid@example.com", status: 1, join: "2023-04-10", cart: [], userType: 0,
          address_detail: { street: "56 Pasteur", ward: "Phường Bến Nghé", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Hoàng Văn Én", phone: "0901234565", password: "123456", email: "vane@example.com", status: 1, join: "2023-05-25", cart: [], userType: 0,
          address_detail: { street: "89 Võ Văn Tần", ward: "Phường Sài Gòn", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Ngô Thị Phụng", phone: "0901234566", password: "123456", email: "thif@example.com", status: 1, join: "2023-06-30", cart: [], userType: 0,
          address_detail: { street: "101 Nam Kỳ Khởi Nghĩa", ward: "Phường Bến Thành", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Đặng Văn Giang", phone: "0901234567", password: "123456", email: "vang@example.com", status: 0, join: "2023-07-12", cart: [], userType: 0,
          address_detail: { street: "234 Hai Bà Trưng", ward: "Phường Đa Kao", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Vũ Thị Hòa", phone: "0901234568", password: "123456", email: "thih@example.com", status: 0, join: "2023-08-18", cart: [], userType: 0,
          address_detail: { street: "67 Lý Tự Trọng", ward: "Phường Bến Thành", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Bùi Văn Dũng", phone: "0901234569", password: "123456", email: "vani@example.com", status: 1, join: "2023-09-22", cart: [], userType: 0,
          address_detail: { street: "88 Đồng Khởi", ward: "Phường Bến Nghé", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Lý Thị Kim", phone: "0901234570", password: "123456", email: "thik@example.com", status: 1, join: "2023-10-05", cart: [], userType: 0,
          address_detail: { street: "12 Nguyễn Thị Minh Khai", ward: "Phường Đa Kao", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Hồ Văn Long", phone: "0901234571", password: "123456", email: "vanl@example.com", status: 1, join: "2023-11-15", cart: [], userType: 0,
          address_detail: { street: "99 Lê Thánh Tôn", ward: "Phường Bến Nghé", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Đỗ Thị Mai", phone: "0901234572", password: "123456", email: "thim@example.com", status: 1, join: "2023-12-20", cart: [], userType: 0,
          address_detail: { street: "33 Tôn Đức Thắng", ward: "Phường Bến Nghé", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Phan Văn Ngọc", phone: "0901234573", password: "123456", email: "vann@example.com", status: 0, join: "2024-01-10", cart: [], userType: 0,
          address_detail: { street: "55 Hàm Nghi", ward: "Phường Nguyễn Thái Bình", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Mai Thị Oanh", phone: "0901234574", password: "123456", email: "thio@example.com", status: 0, join: "2024-02-25", cart: [], userType: 0,
          address_detail: { street: "77 Nguyễn Công Trứ", ward: "Phường Nguyễn Thái Bình", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Chu Văn Phương", phone: "0901234575", password: "123456", email: "vanp@example.com", status: 1, join: "2024-03-05", cart: [], userType: 0,
          address_detail: { street: "44 Calmette", ward: "Phường Nguyễn Thái Bình", city: "Thành phố Hồ Chí Minh" }},
        /* { fullname: "Dương Thị Q", phone: "0901234576", password: "123456", email: "thiq@example.com", status: 1, join: "2024-04-15", cart: [], userType: 0,
          address_detail: { street: "11 Huỳnh Thúc Kháng", ward: "Phường Bến Nghé", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Lâm Văn R", phone: "0901234577", password: "123456", email: "vanr@example.com", status: 1, join: "2024-05-20", cart: [], userType: 0,
          address_detail: { street: "22 Thi Sách", ward: "Phường Bến Nghé", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Tô Thị S", phone: "0901234578", password: "123456", email: "this@example.com", status: 1, join: "2024-06-10", cart: [], userType: 0,
          address_detail: { street: "66 Mạc Đĩnh Chi", ward: "Phường Đa Kao", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Hà Văn T", phone: "0901234579", password: "123456", email: "vant@example.com", status: 1, join: "2024-07-25", cart: [], userType: 0,
          address_detail: { street: "33A Trần Quốc Toản", ward: "Phường Hạnh Thông", city: "Thành phố Hồ Chí Minh" }},
        { fullname: "Phan Văn U", phone: "0901234580", password: "123456", email: "mauu@example.com", status: 1, join: "2024-08-30", cart: [], userType: 0,
          address_detail: { street: "50 Nguyễn Thị Minh Khai", ward: "Phường Đa Kao", city: "Thành phố Hồ Chí Minh" }} */
    ];

    accounts = accounts.concat(sampleCustomers);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    console.log("Đã tạo 20 khách hàng mẫu + địa chỉ chi tiết!");
}

// Tạo đơn hàng mẫu
function createSampleOrders() {
    // Chỉ tạo 1 lần duy nhất
    if (localStorage.getItem('order') !== null && JSON.parse(localStorage.getItem('order')).length >= 10) {
        return;
    }

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const customers = accounts.filter(acc => acc.userType === 0);

    const sampleOrders = [];
    const sampleOrderDetails = [];

    // Danh sách trạng thái cố định cho 10 đơn (để đẹp, có đủ 4 loại)
    const fixedStatuses = [0, 0, 1, 1, 1, 2, 2, 3, 3, 3]; // 2 Chưa xử lý, 3 Đang xử lý, 2 Đang giao, 3 Đã xử lý

    for (let i = 1; i <= 10; i++) {
        const madon = `DH${String(i).padStart(2, '0')}`; // DH01, DH02...
        const customer = customers[(i - 1) % customers.length];
        const diachinhan = `${customer.address_detail.street}, ${customer.address_detail.ward}, ${customer.address_detail.city}`;

        // Ngày đặt: từ 10 ngày trước đến hôm nay (14/11/2025)
        const daysBack = 10 - (i - 1); // DH01: hôm nay, DH10: 9 ngày trước
        const thoigiandatDate = new Date(2025, 10, 14 - daysBack);
        const thoigiandat = thoigiandatDate.toISOString();

        const ngaygiaohangDate = new Date(thoigiandatDate);
        ngaygiaohangDate.setDate(ngaygiaohangDate.getDate() + (i % 3)); // +0, +1, +2 ngày
        const ngaygiaohang = ngaygiaohangDate.toISOString().slice(0, 10);

        const hinhthucgiao = i % 3 === 0 ? "Tự đến lấy" : "Giao tận nơi";
        const thoigiangiao = ["Giao ngay khi xong", "10:00", "14:00", "18:00"][i % 4];
        const ghichu = i % 4 === 0 ? "Gọi trước khi giao nhé" : (i % 5 === 0 ? "Để trước cửa" : "");

        const trangthai = fixedStatuses[i - 1]; // Trạng thái cố định

        // Random 1–3 món
        const numItems = (i % 3) + 1;
        const selectedProducts = products.slice((i - 1) * 3, (i - 1) * 3 + numItems);
        let tongtien = 0;

        selectedProducts.forEach(p => {
            const soluong = Math.floor(Math.random() * 3) + 1;
            const price = p.price;
            tongtien += price * soluong;
            sampleOrderDetails.push({
                madon: madon,
                id: p.id,
                price: price,
                soluong: soluong,
                note: ""
            });
        });

        sampleOrders.push({
            id: madon,
            khachhang: customer.phone,
            hinhthucgiao: hinhthucgiao,
            ngaygiaohang: ngaygiaohang,
            thoigiangiao: thoigiangiao,
            ghichu: ghichu,
            tenguoinhan: customer.fullname,
            sdtnhan: customer.phone,
            diachinhan: diachinhan,
            thoigiandat: thoigiandat,
            tongtien: tongtien,
            trangthai: trangthai
        });
    }

    localStorage.setItem('order', JSON.stringify(sampleOrders));
    localStorage.setItem('orderDetails', JSON.stringify(sampleOrderDetails));
    console.log("Đã tạo 10 đơn hàng mẫu với trạng thái cố định (không random khi refresh)!");
}

// ================== TẠO PHIẾU NHẬP HÀNG MẪU ==================
function createSampleImportBills() {
    // Chỉ tạo 1 lần duy nhất
    if (localStorage.getItem('importBills') !== null && JSON.parse(localStorage.getItem('importBills')).length >= 10) {
        return;
    }

    let products = JSON.parse(localStorage.getItem('products') || '[]');
    const activeProducts = products.filter(p => p.status === 1);

    const sampleImportBills = [];

    for (let i = 1; i <= 10; i++) {
        // Tạo code: PN + YYYYMMDD + random 3 số
        const daysBack = 10 - (i - 1); // Từ hôm nay về trước
        const dateObj = new Date(2025, 10, 14 - daysBack);
        const dateStr = dateObj.toISOString().slice(0, 10).replace(/-/g, '').slice(2);
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const code = `PN${dateStr}${randomNum}`;

        const date = dateObj.toISOString().slice(0, 10);

        // Random 2-5 item
        const numItems = randomInt(2, 5);
        const selectedProducts = randomSample(activeProducts, numItems);
        const items = [];
        let totalValue = 0;

        selectedProducts.forEach(p => {
            const quantity = randomInt(5, 20);
            const importPrice = Math.round(p.price * (randomInt(50, 80) / 100)); // Giá nhập = 50-80% giá bán
            const subtotal = quantity * importPrice;
            totalValue += subtotal;
            items.push({ productId: p.id, quantity, importPrice });

            // Cập nhật tồn kho sản phẩm
            p.quantity = (p.quantity || 0) + quantity;
            p.costPrice = importPrice;
        });

        sampleImportBills.push({ code, date, items, totalValue });
    }

    localStorage.setItem('importBills', JSON.stringify(sampleImportBills));
    localStorage.setItem('products', JSON.stringify(products)); // Cập nhật tồn kho

    console.log("Đã tạo thành công 10 phiếu nhập hàng mẫu!");
}

// Helper functions (nếu chưa có, thêm vào)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSample(arr, n) {
    let shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

// 3. Khởi tạo dữ liệu đơn hàng (không xóa cũ)
function initializeOrderData() {
    if (localStorage.getItem('order') === null) {
        localStorage.setItem('order', JSON.stringify([]));
    }
    if (localStorage.getItem('orderDetails') === null) {
        localStorage.setItem('orderDetails', JSON.stringify([]));
    }
}

// 4. Hàm an toàn lấy dữ liệu từ localStorage
function safeGetItem(key, fallback = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (e) {
        console.error(`Lỗi parse ${key}:`, e);
        return fallback;
    }
}

// 5. Chạy khi load trang
window.addEventListener('load', function () {
    createProduct();
    createAdminAccount();
    createSampleCustomers();
    initializeOrderData();
    createSampleOrders();
    createSampleImportBills();
});

