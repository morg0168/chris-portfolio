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


    <? if (have_posts() ) : while (have_posts()) : the_post(); ?>
    <div class="slider-contain">
      <div class="slider slider-nav">
        <div class="slide video-slide">
          <video id="vid" video autobuffer controls>
            <source src="<? $postID = $post->ID;
              echo get_post_meta($postID,'video', true); ?>" type="video/mp4">
          </video>
          </div>
          <? $pMeta = get_post_meta($postID,'photo1', true);
            if (!empty($pMeta))  { ?>
              <div class="slide">
                <div class="slide-inner" style="background-image: url('<? echo $pMeta; ?>');"></div>
              </div>
          <? } ?>
          <? $pMeta = get_post_meta($postID,'photo2', true);
            if (!empty($pMeta))  { ?>
                <div class="slide">
                  <div class="slide-inner" style="background-image: url('<? echo $pMeta; ?>');"></div>
                </div>
          <? } ?>
          <? $pMeta = get_post_meta($postID,'photo1', true);
            if (!empty($pMeta))  { ?>
                <div class="slide">
                  <div class="slide-inner" style="background-image: url('<? echo $pMeta; ?>');"></div>
                </div>
          <? } ?>
      </div>
    </div>


  <div class="content post row">
      <div class="col-xs-12 col-sm-6 no-padding">
        <article>
          <? the_content(); ?>
        </article>
      </div>
        <div class="col-xs-12 col-sm-6 no-padding">
          <? echo get_post_meta($postID,'description', true); ?>
          <br/>
          <div class="next-page"><div class="arrow"></div></div>
        </div>
    <? endwhile; endif; ?>
  </div>

  </div>

<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<? get_footer(); ?>
