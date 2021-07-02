
   
   <aside>
        
        <div class="about">
          <div class="about__title">
            <h2>關於我</h2>
          </div>
          <div class="about__avata">
            <img src="https://picsum.photos/200/200/?random=1">
          </div>
          <div class="about__info">
            <p>切版花了我好久的時間，但是我沒辦法丟下他不管！對不起，Huli，雖然你說先不用管切版！功能做出來比較重要 😖</p>
          </div>
        </div>
        <div class="about newest__articles">
          <div class="about__title">
            <h2>最新文章</h2>
          </div>
          <?php 
            $top_articles_amount = 5;
            $sql = 'SELECT * From yang36_articles WHERE is_deleted IS NULL ORDER BY article_id DESC LIMIT ?';

            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $top_articles_amount);
            $result = $stmt->execute();

            if(!$result){
              die('SQL Error'.$conn->error);
            }

            $result = $stmt->get_result();
          ?>
          
          <?php while($articles_top = $result->fetch_assoc()){ ?>
            <div class="top_article">
              <a href="article.php?category_id=<?php echo escape($articles_top['category_id'])?>&article_id=<?php echo escape($articles_top['article_id'])?>" class="btn btn-article">
                <span class="comment__title"><?php echo escape($articles_top['article_title']) ?></span>
              </a>
            </div>
            
          <?php } ?>
        </div>
        <div class="about newest__comments">
          <div class="about__title ">
            <h2>最新留言</h2>
          </div>
          <?php 
            $top_comments_amount = 5;
            $sql = 'SELECT C.content, C.username , A.article_title, C.created_at, C.article_id, A.category_id '.
                   'FROM yang36_blog_comments AS C '.
                   'LEFT JOIN yang36_articles AS A '.
                   'ON C.article_id = A.article_id '.
                   'WHERE C.is_deleted IS NULL '.
                   'AND A.is_deleted IS NULL '.
                   'ORDER BY C.comment_id DESC '.
                   'Limit ?';

            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $top_comments_amount);
            $result = $stmt->execute();

            if(!$result){
              die('SQL Error'.$conn->error);
            }

            $result = $stmt->get_result();
          ?>
          <?php while($commets_top = $result->fetch_assoc()){ ?>
              <div class="about__info comment">
                <a href="article.php?category_id=<?php echo escape($commets_top['category_id'])?>&article_id=<?php echo escape($commets_top['article_id'])?>" class="btn btn-article">
                  <sapn class="comment__title"><?php echo escape($commets_top['article_title']) ;?> </sapn>
                </a>
                <p class="comment__content">
                  <?php echo escape($commets_top['content']) ;?>
                
                </p>
                <p class="comment__time"><?php echo escape($commets_top['username']) ;?></p>
                <p class="comment__time"><?php echo escape($commets_top['created_at']) ;?></p>
              </div>
            <?php } ?>
        </div>
      </aside>
    </div>
  </main>



