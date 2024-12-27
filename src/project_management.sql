-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2024 at 04:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('pending','in-progress','completed') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `deadline` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `title`, `description`, `status`, `created_at`, `deadline`) VALUES
(1, 'facebook', 'developement facebook', 'in-progress', '2024-12-25 16:32:15', '2025-01-23'),
(2, 'tabbe3ni', 'ezfzeffzef', 'pending', '2024-12-25 16:32:44', '2025-01-30');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','In-Progress','Completed','Awaiting Approval','Refused') DEFAULT NULL,
  `priority` enum('low','medium','high') NOT NULL,
  `deadline` date DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `review` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `title`, `user_id`, `description`, `status`, `priority`, `deadline`, `project_id`, `created_at`, `review`) VALUES
(1, 'login page', 1, 'dsfsqfdsfezarzezar', 'Awaiting Approval', 'low', '2024-12-31', 2, '2024-12-25 16:33:33', ''),
(2, 'base de donne', 1, 'dsfrzrzecbbvc', 'Awaiting Approval', 'medium', '2025-01-22', 2, '2024-12-25 16:34:42', ''),
(3, 'php api', 1, 'hncngfgjhf', 'Awaiting Approval', 'high', '2024-12-31', 1, '2024-12-25 16:35:12', 'test failed'),
(4, 'design', 1, 'xghfjjfg,', 'In-Progress', 'high', '2025-01-08', 1, '2024-12-25 16:35:34', 'qsdqssq'),
(5, 'sign up', 1, 'omlkjmjlkmjkm', 'Completed', 'low', '2024-12-26', 2, '2024-12-25 16:36:04', '');

-- --------------------------------------------------------

--
-- Table structure for table `task_submissions`
--

CREATE TABLE `task_submissions` (
  `submission_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_submissions`
--

INSERT INTO `task_submissions` (`submission_id`, `task_id`, `user_id`, `message`, `file_path`, `submitted_at`) VALUES
(1, 1, 1, 'dsdsq', 'uploads/Company-amico.png', '2024-12-25 22:01:51'),
(2, 1, 1, 'dsdsq', 'uploads/Company-amico.png', '2024-12-25 22:02:28'),
(3, 3, 1, 'testing', 'uploads/Mental health-bro.png', '2024-12-25 22:03:29'),
(4, 3, 1, 'sdqdssdqqds', 'uploads/Mental health-bro.png', '2024-12-25 22:10:25'),
(5, 2, 1, 'null', 'uploads/Mental health-bro.png', '2024-12-25 22:18:17'),
(6, 4, 1, 'dsqdsq', 'uploads/Good team-bro.png', '2024-12-25 22:19:09'),
(7, 4, 1, 'lmlk', 'uploads/Company-amico.png', '2024-12-26 12:35:33'),
(8, 4, 1, 'lmlk', 'uploads/Company-amico.png', '2024-12-26 12:35:34'),
(9, 4, 1, 'lmlk', 'uploads/Company-amico.png', '2024-12-26 12:35:35'),
(10, 4, 1, 'lmlk', 'uploads/Company-amico.png', '2024-12-26 12:35:52'),
(11, 4, 1, 'lmlk', 'uploads/Company-amico.png', '2024-12-26 12:36:01'),
(12, 4, 1, 'lmlk', 'uploads/Company-amico.png', '2024-12-26 12:36:45'),
(13, 2, 1, 'fqfqfs', 'uploads/Mental health-bro.png', '2024-12-26 12:38:17'),
(14, 2, 1, 'dsqds', 'uploads/Mental health-bro.png', '2024-12-26 12:46:13'),
(15, 2, 1, ',,k,lk', NULL, '2024-12-26 12:52:16'),
(16, 1, 1, 'kjjkl', NULL, '2024-12-26 13:02:32'),
(17, 1, 1, 'hjgj', 'uploads/Mental health-bro.png', '2024-12-26 13:02:59'),
(18, 1, 1, 'feqdfqqfs', NULL, '2024-12-26 13:05:58'),
(26, 1, 1, '', 'uploads/Good team-bro.png', '2024-12-26 16:29:25'),
(27, 1, 1, '', 'uploads/2024-12-26_17-31-11_Good team-bro.png', '2024-12-26 16:31:11'),
(32, 4, 1, 'aaaaaaaaa', NULL, '2024-12-26 16:43:10'),
(33, 1, 1, 'sqddsqdqs', NULL, '2024-12-26 17:19:50'),
(34, 2, 1, 'fdqdqfd', 'uploads/2024-12-26_18-27-40_Good team-bro.png', '2024-12-26 17:27:40'),
(35, 3, 1, 'it is the same', NULL, '2024-12-27 15:06:18');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `name`, `project_id`) VALUES
(1, 'team_tabbe3ni', 2);

-- --------------------------------------------------------

--
-- Table structure for table `team_users`
--

CREATE TABLE `team_users` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_users`
--

INSERT INTO `team_users` (`id`, `team_id`, `user_id`, `role`) VALUES
(1, 1, 1, 'employe'),
(2, 1, 2, 'manager');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'ahmed', 'ahmed@gmail.com', 'ahmed123', '2024-12-25 16:30:02'),
(2, 'adem', 'adem@gmail.com', 'adem123', '2024-12-25 16:30:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `task_submissions`
--
ALTER TABLE `task_submissions`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `task_submissions_ibfk_1` (`task_id`),
  ADD KEY `task_submissions_ibfk_2` (`user_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `team_users`
--
ALTER TABLE `team_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `task_submissions`
--
ALTER TABLE `task_submissions`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `team_users`
--
ALTER TABLE `team_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE;

--
-- Constraints for table `task_submissions`
--
ALTER TABLE `task_submissions`
  ADD CONSTRAINT `task_submissions_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_submissions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE;

--
-- Constraints for table `team_users`
--
ALTER TABLE `team_users`
  ADD CONSTRAINT `team_users_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `team_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
