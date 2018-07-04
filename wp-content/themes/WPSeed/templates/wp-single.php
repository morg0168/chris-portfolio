<?
/**
 * The template for displaying all single posts and attachments
 *
 * @author      Flurin Dürst
 * @version     1.2.3
 * @since       WPegg 0.18
 */
?>

<? get_header(); ?>

<div class="top">
  <a href="<?= get_bloginfo('url'); ?>">
    <div class="logo"></div>
  </a>
  <button class="hamburger--squeeze" id="hamburger" type="button">
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>

</div>

<!-- content » single post -->

  <div class="content post row">


    <? if (have_posts() ) : while (have_posts()) : the_post(); ?>
    <div class="post-carousel"></div>
    <div class="col-xs-12 col-sm-12"> <? $postID = $post->ID;
        echo get_post_meta($postID,'video', true); ?></div>

      <div class="col-xs-12 col-sm-6">
        <article>
          <? the_content(); ?>
        </article>
      </div>
        <div class="col-xs-12 col-sm-6">
          <? echo get_post_meta($postID,'description', true); ?>
        </div>
    <? endwhile; endif; ?>
  </div>

  </div>

<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<? get_footer(); ?>
