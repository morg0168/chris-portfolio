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

<!-- content » blog menu -->

<div class="content home">

  <? if (have_posts() ) : while (have_posts()) : the_post(); ?>
    <article>
      <p class="category-title">Projects</p>
      <p><a href="<?php echo get_post_permalink(); ?>"><? the_title(); ?></a></p>
      <div class="postinfo"><? //get_the_date_german(); ?></div>
        <? // if (has_post_thumbnail()) : ?>
        <!-- <div class="thumbnail" style="background-image: url(<? //the_post_thumbnail_url() ?>)"></div> -->
        <? //endif ?>
      <? //the_content(); ?>
    </article>
  <? endwhile; endif; ?>

</div>
<? get_footer(); ?>
