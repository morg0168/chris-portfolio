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
          <div id="video-container">
            <video id="vid" video autobuffer poster="<? $postID = $post->ID;  echo get_post_meta($postID,'cover', true); ?>" >
              <source src="<? $postID = $post->ID;
                echo get_post_meta($postID,'video', true); ?>" type="video/mp4">
            </video>
            <div id="video-controls">
              <button type="button" id="play-pause"><i class="fa fa-2x fa-play"></i></button>
              <input type="range" id="seek-bar" value="0">
              <button type="button" id="mute">Mute</button>
              <input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1">
              <button type="button" id="full-screen">Full-Screen</button>
            </div>
          </div>
          </div>
          <? $pMeta = get_post_meta($postID,'photo1', true);
            if (!empty($pMeta))  { ?>
              <div class="slide varWidth">
                <div class="slide-inner" style="background-image: url('<? echo $pMeta; ?>');"></div>
              </div>
          <? } ?>
          <? $pMeta = get_post_meta($postID,'photo2', true);
            if (!empty($pMeta))  { ?>
                <div class="slide varWidth">
                  <div class="slide-inner" style="background-image: url('<? echo $pMeta; ?>');"></div>
                </div>
          <? } ?>
          <? $pMeta = get_post_meta($postID,'photo1', true);
            if (!empty($pMeta))  { ?>
                <div class="slide varWidth">
                  <div class="slide-inner" style="background-image: url('<? echo $pMeta; ?>');"></div>
                </div>
          <? } ?>
          <? $pMeta = get_post_meta($postID,'photo1', true);
            if (!empty($pMeta))  { ?>
                <div class="slide varWidth">
                  <div class="slide-inner" style="background-image: url('<? echo $pMeta; ?>');"></div>
                </div>
          <? } ?>
          <!-- <div class="slide last-slide">
            <div class="slide-inner" ></div>
          </div> -->
      </div>
    </div>

    <script>
    var postID = "<?php echo $postID?>";
    var cover = "<?php echo get_post_meta($postID,'cover', true); ?>";
    var photo1 = "<?php echo get_post_meta($postID,'photo1', true);?>";
    var photo2 = "<?php echo get_post_meta($postID,'photo2', true);?>";
    var images = [];
    function preload() {
        for (var i = 0; i < arguments.length; i++) {
            images[i] = new Image();
            images[i].src = preload.arguments[i];
        }
        console.log(images);
    }

    //-- usage --//
    preload(
        cover,
        photo1,
        photo2
    )
    </script>


  <div class="content post row">
      <div class="col-xs-12 col-sm-6 no-padding">
        <article>
          <? the_content(); ?>
        </article>
      </div>
        <div class="col-xs-12 col-sm-6 no-padding">
          <? echo get_post_meta($postID,'description', true); ?>
          <br/>
          <!-- <?// $next_post = get_next_post();
          //  if ( is_a( $next_post , 'WP_Post' ) ) : ?>
                <a href="<? //echo get_permalink( $next_post->ID ); ?>"><? //echo get_the_title( $next_post->ID ); ?></a>
            <? //endif; ?> -->


        <?    $post_id = $postID; // current post ID
              $cat = get_the_category();
              $current_cat_id = $cat[0]->cat_ID; // current category ID

              var_dump($current_cat_id);

              $args = array(
                  'category' => $current_cat_id,
                  'orderby'  => 'post_date',
                  'order'    => 'ASC'
              );
              $posts = get_posts( $args );
              // get IDs of posts retrieved from get_posts
              $ids = array();
              foreach ( $posts as $thepost ) {
                  $ids[] = $thepost->ID;
              }
              // get and echo previous and next post in the same category
              $thisindex = array_search( $post_id, $ids );
              $previd    = isset( $ids[ $thisindex - 1 ] ) ? $ids[ $thisindex - 1 ] : 0;
              $nextid    = isset( $ids[ $thisindex + 1 ] ) ? $ids[ $thisindex + 1 ] : 0;

              if ( $previd ) {
                  ?><a rel="prev" href="<?php echo get_permalink($previd) ?>">Previous</a><?php
              }
              if ( $nextid ) {
                  ?><a rel="next" href="<?php echo get_permalink($nextid) ?>">Next</a><?php
              } ?>


          <a href="#"><div class="next-page"><div class="arrow"></div></div></a>
        </div>
    <? endwhile; endif; ?>
  </div>

  </div>

<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<? get_footer(); ?>
