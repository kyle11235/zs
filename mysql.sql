CREATE SCHEMA `zs` DEFAULT CHARACTER SET utf8 ;


CREATE TABLE `zs`.`incident` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cat1` VARCHAR(100) NULL,
  `cat2` VARCHAR(100) NULL,
  `cat3` VARCHAR(100) NULL,
  `cat4` VARCHAR(100) NULL,
  `cat5` VARCHAR(100) NULL,
  `title` VARCHAR(100) NULL,
  `description` TEXT NULL,
  `create_time` DATETIME NULL,
  `create_by` VARCHAR(100) NULL,
  `update_time` DATETIME NULL,
  `update_by` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));


INSERT INTO `zs`.`incident` (`id`, `cat1`, `cat2`, `cat3`, `cat4`, `cat5`, `title`, `description`, `create_time`, `create_by`, `update_time`, `update_by`) 
VALUES ('1', '第一航站楼', '南航', '值机1', '机械故障', '传送带', '无法安检行李', '传送带断裂', '2019-01-01', 'kyle', '2019-01-01', 'kyle');

INSERT INTO `zs`.`incident` (`id`, `cat1`, `cat2`, `cat3`, `cat4`, `cat5`, `title`, `description`, `create_time`, `create_by`, `update_time`, `update_by`) 
VALUES ('2', '第一航站楼', '海航', '值机2', '机械故障', '传送带', '无法安检行李', '传送带速度极慢', '2019-01-01', 'kyle', '2019-01-01', 'kyle');

INSERT INTO `zs`.`incident` (`id`, `cat1`, `cat2`, `cat3`, `cat4`, `cat5`, `title`, `description`, `create_time`, `create_by`, `update_time`, `update_by`) 
VALUES ('3', '第2航站楼', '出发安检', '安检机1', '电脑故障', '显示屏', '不显示图像', '显示屏蓝屏', '2019-01-01', 'kyle', '2019-01-01', 'kyle');

