<?
/**
 * The template displaying the posts-overview
 *
 * @author      Flurin Dürst
 * @version     1.4.1
 * @since       WPSeed 0.18
 */

?>

<? get_header(); ?>

<!-- content » blog home -->

<div class="top mobile home-top">
  <a href="<?= get_bloginfo('url'); ?>/menu">
    <div class="logo"></div>
  </a>
  <a href="<?= get_bloginfo('url'); ?>/menu">
    <button class="hamburger--squeeze is-active" id="hamburger" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
  </a>
</div>

  <div class="home">
    <div id="container"></div>
    <div class="row middle-xs start-xs center-sm bio">
      <div class="col-xs-12">
        <p class="intro">

        <?php
              $arg = null;
              $arg = array(
              'numberposts' => 1,
              'offset' => 0,
              'category_name' => "bio",
              'orderby' => 'post_date',
              'order' => 'ASC',
              'post_type' => 'post',
              'post_status' => 'draft, publish, future, pending, private',
              'suppress_filters' => true
          );

          $bio = new WP_Query( $arg ); ?>

          <? if ($bio->have_posts() ) : while ($bio->have_posts()) : $bio->the_post();
          echo the_content();
          endwhile; endif; wp_reset_query(); ?>

        </p>
          <br/><br/><br/><a href="<?= get_bloginfo('url'); ?>/menu" class="desktop">
            <div class="logo"></div>
          </a>
      </div>
    </div>
  </div>

<? get_footer(); ?>
