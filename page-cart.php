<?php 
/*
Template name: Корзина
*/
?>

<?php get_header() ?>

<section class="section cart">
    <h1 class="section-title">КОРЗИНА</h1>
    <div class="cart-empty d-none">
        <i class="fas fa-shopping-cart"></i>
        <h2>Ваша корзина пока пуста </br><a href="<?php echo get_home_url(); ?>/katalog" class="page-404__link">Перейти в каталог</a></h2>
    </div>
    <div class="cart-active">
        <table class="cart__table">
            <thead>
                <tr>
                    <th>
                        Название
                    </th>
                    <th>
                        Артикул
                    </th>
                    <th>
                        Цена за шт.
                    </th>
                    <th>
                        Кол-во
                    </th>
                </tr>
            </thead>
        </table>
        <div class="cart__order">
            <?php echo do_shortcode('[contact-form-7 id="126" title="Форма оформления заказа"]'); ?>
            <div class="cart__order-total">
                <h2>Итого</h2>
                <h3>Сумма заказа: <span class="cart__order-total-cost"><i class="ml-1 fas fa-ruble-sign"></i></span></h3>
                <p>Рассчитать стоимость доставки:</p>
                <div class="catalogue__card-delivery-companies">
                    <img src="<?php echo bloginfo('template_url'); ?>/dist/assets/img/cdek_logo.jpg" class="cdek-logo delivery-company">
                    <img src="<?php echo bloginfo('template_url'); ?>/dist/assets/img/pek_logo.jpg" class="pek-logo delivery-company">
                    <img src="<?php echo bloginfo('template_url'); ?>/dist/assets/img/dellinii_logo.png" class="dellinii-logo delivery-company">
                    <img src="<?php echo bloginfo('template_url'); ?>/dist/assets/img/baikal-service_logo.png" class="baikal-service-logo delivery-company">
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
</section>

<?php get_footer(); ?>