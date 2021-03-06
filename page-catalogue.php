<? 
/*
Template name: Каталог
*/
?>

<? get_header(); ?>
        <section class="section catalogue">
            <div class="d-flex flex-md-row flex-column">
                <div class="catalogue__list-wrapper">
                    <div class="position-relative mb-2">
                        <input type="text" placeholder="Поиск по названию или артикулу" class="catalogue__search"><i class="fas fa-search"></i>
                    </div>
                    <span class="catalogue__sort-by">
                        Сортировать по: 
                        <a href="" class="mx-md-2 mx-3 catalogue__sort-by-price">цене</a>
                        <a href="" class="mx-md-2 mx-3 catalogue__sort-by-name">алфавиту</a>
                    </span>
                    <div class="catalogue__table-wrapper">
                        <table class="catalogue__table" cellspacing="0" cellpadding="2px">
                            <col class="catalogue__table-col-1">
                            <col class="catalogue__table-col-2">
                            <col class="catalogue__table-col-3">
                            <col class="catalogue__table-col-4">
                            <thead>
                                <tr>
                                    <th colspan="2">
                                        Название
                                    </th>
                                    <th>
                                        Артикул
                                    </th>
                                    <th>
                                        Цена
                                    </th>
                                </tr>
                            </thead>
                            <span class="d-none catalogue__category-name"></span>
                            <script>
                                const chosenCategory = localStorage.getItem("category");
                                document.querySelector(".catalogue__category-name").innerHTML = chosenCategory;
                            </script>
                            <?

                                if ($_GET['category']) {
                                    $category_name = $_GET['category'];
                                } else {
                                    $category_name = 'products';
                                }

                                $posts = get_posts( array(
                                    'numberposts'      => -1,
                                    'category_name'    => $category_name,
                                    'orderby'          => 'date',
                                    'order'            => 'ASC',
                                    'post_type'        => 'post',
                                    'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
                                ) );

                                foreach( $posts as $post ){
                                    setup_postdata($post);
                                    $thumb = get_field('product_thumb');
                                    ?>

                                    <tr class="catalogue__table-item">
                                        <td class="catalogue__table-item-thumb">
                                            <div style="background-image: url('<?=$thumb['sizes']['thumbnail']; ?>');" alt=""></div>
                                        </td>
                                        <td class="catalogue__table-item-name">
                                            <? the_field('product_name'); ?>
                                        </td>
                                        <td class="catalogue__table-item-article">
                                            <? the_field('product_article'); ?>
                                        </td>
                                        <td class="catalogue__table-item-price">
                                            <span><? the_field('product_price'); ?></span><i class="ml-1 fas fa-ruble-sign"></i>
                                        </td>
                                    </tr>

                                    <? 
                                }
                            ?>

                        </table>
                    </div>
                </div>
                <div class="catalogue__card-wrapper">
                    <div class="catalogue__card">
                        <div class="catalogue__card-empty">
                            Выберите товар
                        </div>
                        <div class="catalogue__card-content d-none">
                            <h1 class="catalogue__card-name"></h1>
                            <div class="catalogue__card-imgs"></div>
                            <div class="catalogue__card-price"></div>
                            <p>
                                <span class="catalogue__card-add-to-cart"><i class="fas fa-shopping-cart"></i><i class="fas fa-check d-none"></i>Добавить в корзину</span>
                                <input type="number" class="catalogue__card-add-to-cart-amount rounded ml-1" name="amount" value="1" min="1">
                            </p>
                            <div>
                                <span>Артикул: </span><span class="catalogue__card-article"></span>
                            </div>
                            <p class="catalogue__card-description"></p>
                            <p>Рассчитать стоимость доставки:</p>
                            <div class="catalogue__card-delivery-companies">
                                <img src="<? echo bloginfo('template_url'); ?>/dist/assets/img/cdek_logo.jpg" class="cdek-logo delivery-company mr-1 mb-1">
                                <img src="<? echo bloginfo('template_url'); ?>/dist/assets/img/pek_logo.jpg" class="pek-logo delivery-company mr-1 mb-1">
                                <img src="<? echo bloginfo('template_url'); ?>/dist/assets/img/dellinii_logo.png" class="dellinii-logo delivery-company mr-1 mb-1">
                                <img src="<? echo bloginfo('template_url'); ?>/dist/assets/img/baikal-service_logo.png" class="baikal-service-logo delivery-company mr-1 mb-1">
                            </div>
                            <div class="modal">
                                <div class="container d-flex justify-content-center">
                                    <div class="modal-content delivery-calculator">
                                        <a class="modal-close"></a>
                                        <iframe class="cdek-iframe d-none" id="sdek_calc_iframe" src="https://kit.cdek-calc.ru/calc.php?" width="300" height="304" scrolling="no" frameborder="0"></iframe>
                                        <iframe class="pek-iframe d-none" allowtransparency="true" frameborder="0" width="250" height="345" scrolling="no" style="border:1px solid #ededed" src="https://pecom.ru/ru/newcalc/"></iframe>
                                        <iframe class="dellinii-iframe d-none" src="https://widgets.dellin.ru/calculator?derival_to_door=off&arrival_to_door=on&disabled_calculation=off&insurance=0&package=1" width="330" height="370" scrolling="no" frameborder="0"></iframe>
                                        <iframe class="baikal-service-iframe d-none" src="https://api.baikalsr.ru/widget/calculator?" width="310" height="525" scrolling="no" frameborder="0"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="catalogue__info d-none">
                    <?                                  
                        foreach( $posts as $post ){
                            ?>

                            <div class="catalogue__info-item">
                                <div class="catalogue__info-article">
                                    <? the_field('product_article'); ?>
                                </div>
                                <div class="catalogue__info-imgs">
                                    <?
                                        $images = acf_photo_gallery('product_imgs', $post->ID);;
                                        foreach($images as $image):
                                            $imageId = $image["id"];
                                            $imageUrl = wp_get_attachment_image_url($imageId, 'medium_large');
                                            ?>
                                            <span class="catalogue__info-img"><?=$imageUrl?></span>
                                            <span class="catalogue__info-img-full"><?=$image['full_image_url']?></span>
                                            <?
                                        endforeach;
                                    ?>
                                </div>
                                <div class="catalogue__info-description">
                                    <? the_field('product_description'); ?>
                                </div>
                                <div class="catalogue__info-name">
                                    <? the_field('product_name'); ?>
                                </div>
                                <div class="catalogue__info-price">
                                    <? the_field('product_price'); ?>
                                </div>
                            </div>

                            <? 
                        }

                        wp_reset_postdata(); // сброс
                    ?>
                </div>
            </div>
        </section>
<? get_footer(); ?>