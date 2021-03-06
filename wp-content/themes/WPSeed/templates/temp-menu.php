<?
/**
 * Template for the Home-Site containing a teaser-image.
 *
 * @author      Flurin Dürst
 * @version     1.1.1
 * @since       WPSeed 0.2
 *
 */
?>
<? /* Template Name: Menu */ ?>

<? get_header(); ?>

<!-- content » home -->
<div class="barba-container" data-namespace="menu">
  <div class="menu-list row middle-xs between-xs">
    <div class="menu-container row start-xs center-sm">
    <!-- FILM COLUMN-->
    <div class="col-xs-12 col-sm-4 row start-xs center-sm">
      <div class="">
    <?php
          $arg = null;
          $arg = array(
          'numberposts' => 8,
          'offset' => 0,
          'category_name' => "Projects",
          'orderby' => 'post_date',
          'order' => 'ASC',
          'post_type' => 'post',
          'post_status' => 'draft, publish, future, pending, private',
          'suppress_filters' => true
      );

      $events = new WP_Query( $arg ); ?>
        <p class="category-title">Work</p>
        <? if ($events->have_posts() ) : while ($events->have_posts()) : $events->the_post(); ?>
          <article>
            <p><a href="<?php echo get_post_permalink(); ?>"><? the_title(); ?></a></p>
          </article>
        <? endwhile; endif; wp_reset_query();?>
      </div>
    </div>

      <!-- CLIENTS COLUMN-->
      <div class="col-xs-12 col-sm-4 row start-xs center-sm">
          <div class="">
      <?php
            $arg = null;
            $arg = array(
            'numberposts' => 8,
            'offset' => 0,
            'category_name' => "Clients",
            'orderby' => 'post_date',
            'order' => 'ASC',
            'post_type' => 'post',
            'post_status' => 'draft, publish, future, pending, private',
            'suppress_filters' => true
        );

        $events = new WP_Query( $arg ); ?>

          <? if ($events->have_posts() ) : while ($events->have_posts()) : $events->the_post(); ?>
            <article>
              <p class="category-title">Clients</p>
              <p><? the_content(); ?></p>
            </article>
          <? endwhile; endif; wp_reset_query();?>
        </div>
      </div>

        <!-- ACADEMIA COLUMN-->
        <div class="col-xs-12 col-sm-4 row start-xs center-sm">
            <div class="">
        <?php
              $arg = null;
              $arg = array(
              'numberposts' => 8,
              'offset' => 0,
              'category_name' => "Academia",
              'orderby' => 'post_date',
              'order' => 'ASC',
              'post_type' => 'post',
              'post_status' => 'draft, publish, future, pending, private',
              'suppress_filters' => true
          );

          $events = new WP_Query( $arg ); ?>

            <? if ($events->have_posts() ) : while ($events->have_posts()) : $events->the_post(); ?>
              <article>
                <p class="category-title">Academia</p>
                <p><? the_content(); ?></p>
              </article>
            <? endwhile; endif; wp_reset_query();?>

            <!-- PERSONAL COLUMN-->
            <?php
                  $arg = null;
                  $arg = array(
                  'numberposts' => 8,
                  'offset' => 0,
                  'category_name' => "Personal",
                  'orderby' => 'post_date',
                  'order' => 'ASC',
                  'post_type' => 'post',
                  'post_status' => 'draft, publish, future, pending, private',
                  'suppress_filters' => true
              );

              $events = new WP_Query( $arg ); ?>

                <? if ($events->have_posts() ) : while ($events->have_posts()) : $events->the_post(); ?>
                  <article>
                    <p class="category-title">Personal</p>
                    <p><? the_content(); ?></p>
                  </article>
                <? endwhile; endif; wp_reset_query();?>

                <!-- PERSONAL COLUMN-->
                <?php
                      $arg = null;
                      $arg = array(
                      'numberposts' => 8,
                      'offset' => 0,
                      'category_name' => "Links",
                      'orderby' => 'post_date',
                      'order' => 'ASC',
                      'post_type' => 'post',
                      'post_status' => 'draft, publish, future, pending, private',
                      'suppress_filters' => true
                  );

                  $events = new WP_Query( $arg ); ?>

                    <? if ($events->have_posts() ) : while ($events->have_posts()) : $events->the_post(); ?>
                      <article>
                        <p class="category-title">Links</p>
                        <p><? the_content(); ?></p>
                      </article>
                    <? endwhile; endif; wp_reset_query();?>

          </div>
        </div>
        </div>
  </div>
</div>

<? get_footer(); ?>
